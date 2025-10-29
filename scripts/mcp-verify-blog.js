#!/usr/bin/env node
/**
 * Minimal MCP client to launch chrome-devtools-mcp, open the blog, and capture evidence.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_PREFIX = '[mcp-client]';

function log(...args) {
  console.log(LOG_PREFIX, ...args);
}

function createMcpClient() {
  const child = spawn(
    'npx',
    ['chrome-devtools-mcp@latest', '--isolated', '--viewport', '1280x720'],
    {
      stdio: ['pipe', 'pipe', 'pipe'],
    }
  );

  child.stderr.on('data', chunk => process.stderr.write(chunk));

  let buffer = '';
  const pending = new Map();
  let nextId = 1;

  function handleMessage(message) {
    if (Object.prototype.hasOwnProperty.call(message, 'id')) {
      const entry = pending.get(message.id);
      if (!entry) {
        log('Received response for unknown id', message.id);
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

    if (message.method === 'notifications/message' && message.params) {
      log(`Notification (${message.params.level || 'info'}):`, message.params.data ?? message.params.message ?? '');
    } else if (message.method === 'notifications/progress' && message.params) {
      log(
        `Progress: ${message.params.progress}/${message.params.total ?? '?'} ${message.params.message ?? ''}`.trim()
      );
    } else if (message.method === 'notifications/tools/list_changed') {
      log('Tool list updated.');
    } else {
      log('Unhandled notification:', JSON.stringify(message));
    }
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

  async function sendRequest(method, params = {}) {
    const id = nextId++;
    const payload = {
      jsonrpc: '2.0',
      id,
      method,
      params,
    };
    child.stdin.write(JSON.stringify(payload) + '\n');
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
    });
  }

  function sendNotification(method, params = {}) {
    const payload = {
      jsonrpc: '2.0',
      method,
      params,
    };
    child.stdin.write(JSON.stringify(payload) + '\n');
  }

  async function initialize() {
    await sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'ctc-mcp-client',
        version: '0.1.0',
      },
    });
    sendNotification('notifications/initialized', {});
  }

  async function listTools() {
    const result = await sendRequest('tools/list', {});
    const names = (result?.tools ?? []).map(tool => tool.name).sort();
    log('Available tools:', names.join(', '));
    return names;
  }

  async function callTool(name, args = {}) {
    log(`Calling tool ${name} with`, args);
    const result = await sendRequest('tools/call', { name, arguments: args });
    if (result?.content?.length) {
      for (const block of result.content) {
        if (block.type === 'text' && block.text) {
          log(`→ ${block.text}`);
        } else if (block.type === 'image' && block.data) {
          log(`→ Received inline image (${block.mimeType || 'unknown mime'})`);
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
        // ignore
      }
      const terminated = child.kill('SIGTERM');
      if (!terminated) {
        resolve();
      } else {
        setTimeout(() => {
          child.kill('SIGKILL');
        }, 2000).unref();
      }
    });
  }

  return {
    initialize,
    listTools,
    callTool,
    shutdown,
  };
}

async function main() {
  const targetUrl = process.argv[2] || 'http://localhost:3003/blog';
  const waitText = process.argv[3] || 'Complete Tech Care';
  const safeNameBase = targetUrl
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  const snapshotPath = path.resolve(`logs/mcp-${safeNameBase || 'page'}-snapshot.txt`);
  const screenshotPath = path.resolve(`logs/mcp-${safeNameBase || 'page'}.png`);

  const client = createMcpClient();
  try {
    await client.initialize();
    await client.listTools();

    await client.callTool('new_page', {
      url: targetUrl,
      timeout: 20000,
    });

    await client.callTool('wait_for', {
      text: waitText,
      timeout: 20000,
    });

    const snapshot = await client.callTool('take_snapshot', {});
    if (snapshot?.content?.length) {
      const snapshotText = snapshot.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');
      fs.writeFileSync(snapshotPath, snapshotText, 'utf8');
      log(`Saved snapshot text to ${snapshotPath}`);
    }

    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await client.callTool('take_screenshot', {
      fullPage: true,
      filePath: screenshotPath,
      format: 'png',
    });
    log(`Saved screenshot to ${screenshotPath}`);
  } catch (error) {
    console.error(LOG_PREFIX, 'Error during MCP session:', error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 250));
    try {
      await client.shutdown();
    } catch {
      // ignore
    }
  }

  process.exit(0);
}

main();
