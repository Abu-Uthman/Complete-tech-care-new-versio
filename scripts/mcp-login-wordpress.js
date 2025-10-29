#!/usr/bin/env node
/**
 * Script: scripts/mcp-login-wordpress.js
 * Purpose: Demonstrate Chrome MCP usage to log into the WordPress admin UI.
 *
 * Usage:
 *   node scripts/mcp-login-wordpress.js [url] [username] [password]
 *
 * Default URL: http://ctcbackend.local/wp-admin
 * Default username/password fall back to admin / 123.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_PREFIX = '[mcp-login]';

function log(...args) {
  console.log(LOG_PREFIX, ...args);
}

const DEFAULT_URL = 'http://ctcbackend.local/wp-admin';

function createClient() {
  const child = spawn('npx', ['chrome-devtools-mcp@latest', '--isolated', '--viewport', '1280x720'], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  child.stderr.on('data', chunk => process.stderr.write(chunk));

  const pending = new Map();
  let buffer = '';
  let nextId = 1;

  function handleMessage(message) {
    if (Object.prototype.hasOwnProperty.call(message, 'id')) {
      const entry = pending.get(message.id);
      if (!entry) {
        log('Response for unknown id', message.id);
        return;
      }
      pending.delete(message.id);
      if (message.error) {
        entry.reject(new Error(message.error.message || 'Unknown MCP error'));
      } else {
        entry.resolve(message.result);
      }
      return;
    }

    if (message.method === 'notifications/message') {
      const params = message.params || {};
      log(`Notification (${params.level || 'info'}):`, params.message ?? params.data ?? '');
      return;
    }

    if (message.method === 'notifications/progress') {
      const params = message.params || {};
      log(
        `Progress ${params.progress}/${params.total ?? '?'} ${params.message ?? ''}`.trim()
      );
      return;
    }

    if (message.method === 'notifications/tools/list_changed') {
      log('Tool list changed.');
      return;
    }

    log('Unhandled notification:', JSON.stringify(message));
  }

  child.stdout.on('data', chunk => {
    buffer += chunk.toString();
    let newlineIndex;
    while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      if (!line) {
        continue;
      }
      try {
        const message = JSON.parse(line);
        handleMessage(message);
      } catch (error) {
        log('Failed to parse MCP message:', line, error.message);
      }
    }
  });

  function send(payload) {
    child.stdin.write(JSON.stringify(payload) + '\n');
  }

  async function request(method, params = {}) {
    const id = nextId++;
    send({ jsonrpc: '2.0', id, method, params });
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
    });
  }

  function notify(method, params = {}) {
    send({ jsonrpc: '2.0', method, params });
  }

  async function initialize() {
    await request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'ctc-mcp-login-client',
        version: '0.1.0',
      },
    });
    notify('notifications/initialized', {});
  }

  async function listTools() {
    const result = await request('tools/list', {});
    const names = (result?.tools ?? []).map(tool => tool.name).sort();
    log('Tools:', names.join(', '));
    return names;
  }

  async function callTool(name, args = {}) {
    log(`Calling ${name} with`, args);
    const result = await request('tools/call', { name, arguments: args });
    if (result?.content) {
      for (const block of result.content) {
        if (block.type === 'text' && block.text) {
          log(`→ ${block.text}`);
        }
      }
    }
    return result;
  }

  async function shutdown() {
    return new Promise(resolve => {
      const handleExit = () => resolve();
      child.once('exit', handleExit);
      try {
        child.stdin.end();
      } catch {
        /* ignore */
      }
      const terminated = child.kill('SIGTERM');
      if (!terminated) {
        resolve();
      } else {
        setTimeout(() => child.kill('SIGKILL'), 2000).unref();
      }
    });
  }

  return { initialize, listTools, callTool, shutdown };
}

function extractUid(snapshotText, matcher) {
  const regex = new RegExp(`uid=(\\S+) ${matcher}`);
  const match = regex.exec(snapshotText);
  if (!match) {
    throw new Error(`Could not find element for pattern: ${matcher}`);
  }
  return match[1];
}

async function main() {
  const targetUrl = process.argv[2] || DEFAULT_URL;
  const username = process.argv[3] || 'admin';
  const password = process.argv[4] || '123';
  const safeNameBase = targetUrl
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'wp-admin';
  const snapshotPathBefore = path.resolve(`logs/mcp-${safeNameBase}-login-page.txt`);
  const snapshotPathAfter = path.resolve(`logs/mcp-${safeNameBase}-dashboard.txt`);
  const screenshotPath = path.resolve(`logs/mcp-${safeNameBase}-dashboard.png`);

  const client = createClient();

  try {
    await client.initialize();
    await client.listTools();

    await client.callTool('new_page', { url: targetUrl, timeout: 20000 });
    await client.callTool('wait_for', { text: 'Username', timeout: 10000 });

    const loginSnapshot = await client.callTool('take_snapshot', {});
    const snapshotText = (loginSnapshot?.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');
    fs.writeFileSync(snapshotPathBefore, snapshotText, 'utf8');
    log(`Saved login snapshot to ${snapshotPathBefore}`);

    const usernameUid = extractUid(snapshotText, 'textbox "Username or Email Address"');
    const passwordUid = extractUid(snapshotText, 'textbox "Password"');

    await client.callTool('fill_form', {
      elements: [
        { uid: usernameUid, value: username },
        { uid: passwordUid, value: password },
      ],
    });

    const preLoginSnapshot = await client.callTool('take_snapshot', {});
    const preLoginText = (preLoginSnapshot?.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');
    const loginButtonUid = extractUid(preLoginText, 'button "Log In"');

    await client.callTool('click', { uid: loginButtonUid });

    await client.callTool('wait_for', { text: 'Dashboard', timeout: 20000 });

    const dashboardSnapshot = await client.callTool('take_snapshot', {});
    const dashboardText = (dashboardSnapshot?.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');
    fs.writeFileSync(snapshotPathAfter, dashboardText, 'utf8');
    log(`Saved dashboard snapshot to ${snapshotPathAfter}`);

    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await client.callTool('take_screenshot', {
      fullPage: true,
      filePath: screenshotPath,
      format: 'png',
    });
    log(`Saved dashboard screenshot to ${screenshotPath}`);
  } catch (error) {
    console.error(LOG_PREFIX, 'Error during WordPress login workflow:', error.message);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 250));
    try {
      await client.shutdown();
    } catch {
      /* ignore */
    }
  }
}

main();
