<?php
/**
 * Test script for CTC Smart-Hands API
 *
 * This script tests the HMAC authenticated endpoints
 *
 * Usage: php docs/test-api.php
 */

// Configuration
$API_BASE = 'http://ctcbackend.local/wp-json/ctc/v1';
$API_KEY = 'ctc_your-api-key-from-wordpress'; // Replace with actual key from WP admin
$API_SECRET = 'your-secret-from-wordpress'; // Replace with actual secret from WP admin

/**
 * Calculate HMAC signature
 */
function calculate_hmac($timestamp, $body, $secret) {
    $message = $timestamp . $body;
    return hash_hmac('sha256', $message, $secret);
}

/**
 * Make authenticated API request
 */
function api_request($method, $endpoint, $data = null) {
    global $API_BASE, $API_KEY, $API_SECRET;

    $url = $API_BASE . $endpoint;
    $timestamp = (string) time();
    $body = $data ? json_encode($data) : '';
    $signature = calculate_hmac($timestamp, $body, $API_SECRET);

    $headers = [
        'Content-Type: application/json',
        'X-CTC-Key: ' . $API_KEY,
        'X-CTC-Timestamp: ' . $timestamp,
        'X-CTC-Signature: ' . $signature,
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    } elseif ($method === 'PATCH') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    echo "\n" . str_repeat('=', 60) . "\n";
    echo "$method $endpoint\n";
    echo "HTTP Status: $http_code\n";
    echo str_repeat('=', 60) . "\n";

    if ($response) {
        $json = json_decode($response, true);
        echo json_encode($json, JSON_PRETTY_PRINT) . "\n";
    } else {
        echo "No response\n";
    }

    return json_decode($response, true);
}

echo "\n🧪 CTC Smart-Hands API Test Suite\n";
echo "====================================\n";

// Test 1: Create a booking
echo "\n\n📝 Test 1: Create Booking (POST /bookings)\n";
$booking_data = [
    'company' => 'Test Company Pty Ltd',
    'contact_name' => 'John Smith',
    'email' => 'john@testcompany.com.au',
    'phone' => '0412345678',
    'po_number' => 'PO-TEST-001',
    'sla' => '4H',
    'work_type' => 'POS terminal replacement',
    'site_id' => 'TEST001',
    'address' => '123 Test Street, Bendigo VIC 3550',
    'access_window' => '9am-5pm',
    'onsite_contact' => 'Store Manager',
    'parts_tracking' => 'RMA12345',
    'notes' => 'Test booking created via API test script',
];

$result = api_request('POST', '/bookings', $booking_data);

if (isset($result['id'])) {
    $booking_id = $result['id'];
    $public_id = $result['public_id'];

    // Test 2: Get booking by ID
    echo "\n\n📖 Test 2: Get Booking (GET /bookings/$booking_id)\n";
    api_request('GET', "/bookings/$booking_id");

    // Test 3: Update booking status
    echo "\n\n✏️  Test 3: Update Booking (PATCH /bookings/$booking_id)\n";
    api_request('PATCH', "/bookings/$booking_id", [
        'status' => 'confirmed',
    ]);

    // Test 4: Send notification
    echo "\n\n📧 Test 4: Send Notification (POST /bookings/$booking_id/notify)\n";
    api_request('POST', "/bookings/$booking_id/notify", [
        'type' => 'eta',
        'eta' => '2 hours',
    ]);

    // Test 5: List bookings
    echo "\n\n📋 Test 5: List Bookings (GET /bookings)\n";
    api_request('GET', '/bookings');
} else {
    echo "\n❌ Failed to create booking. Check API key and secret.\n";
    echo "Get them from: http://ctcbackend.local/wp-admin/admin.php?page=ctc-settings-api\n\n";
}

// Test 6: Test invalid timestamp (should fail with 401)
echo "\n\n⏰ Test 6: Invalid Timestamp (should fail)\n";
$old_timestamp = (string) (time() - 400); // 6+ minutes old
$body = json_encode(['test' => 'data']);
$signature = calculate_hmac($old_timestamp, $body, $API_SECRET);

$headers = [
    'Content-Type: application/json',
    'X-CTC-Key: ' . $API_KEY,
    'X-CTC-Timestamp: ' . $old_timestamp,
    'X-CTC-Signature: ' . $signature,
];

$ch = curl_init($API_BASE . '/bookings');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status: $http_code (expected 401)\n";
if ($response) {
    $json = json_decode($response, true);
    echo json_encode($json, JSON_PRETTY_PRINT) . "\n";
}

echo "\n\n✅ API Test Suite Complete!\n\n";
