# 🎯 CTC Invoice System - Activation Guide

## ✅ VERIFIED: Invoice System Successfully Activated!

**Status:** ✅ All database tables created successfully (verified October 26, 2025)

The invoice system has been integrated into your **existing** CTC Smart-Hands plugin (NOT a separate plugin).

**Files Modified:**
- `ctc-smart-hands.php` - Fixed to load Invoice class during activation ✅
- `class-database.php` - Removed FOREIGN KEY constraints (dbDelta limitation) ✅
- `class-invoice.php` - Removed FOREIGN KEY constraints (dbDelta limitation) ✅
- `class-rest-api.php` - Added 6 invoice API endpoints ✅

**Database Tables Created:**
- ✅ `wp_ctc_bookings` - 28 columns, 0 records
- ✅ `wp_ctc_booking_notes` - 6 columns, 0 records
- ✅ `wp_ctc_invoices` - 18 columns, 0 records

---

## 🔧 How to Activate Invoice System

### **Step 1: Open WordPress Admin**
1. Start Local by Flywheel (if not running)
2. Navigate to: `http://ctcbackend.local/wp-admin`
3. Login with your admin credentials

### **Step 2: Reactivate Plugin**
1. Click **Plugins** in left sidebar
2. Find "CTC Smart-Hands" plugin
3. Click **Deactivate**
4. Click **Activate** again

✅ This will create the `wp_ctc_invoices` database table

### **Step 3: Verify Table Created**

Run this command from your project root:
```bash
cd /Users/abuuuthman/projects/ctc_project
php test_invoice_table.php
```

You should see:
```
✅ SUCCESS: Invoice table 'wp_ctc_invoices' exists!
```

---

## 📊 Invoice System Features

### **Auto-Invoice Generation**
When you change a booking status to "completed", an invoice is **automatically created** with:
- Invoice number: `INV-YYYYMMDD-XXXX`
- Line items: Service fee + Travel cost (based on region)
- GST: 10% (Australian tax)
- Due date: 7 days from issue date

### **API Endpoints Available**

All endpoints use HMAC authentication:

```
POST   /wp-json/ctc/v1/invoices              Create invoice
GET    /wp-json/ctc/v1/invoices              List invoices
GET    /wp-json/ctc/v1/invoices/123          Get invoice
PATCH  /wp-json/ctc/v1/invoices/123          Update (mark as paid)
DELETE /wp-json/ctc/v1/invoices/123          Delete invoice
GET    /wp-json/ctc/v1/bookings/456/invoice  Get invoice for booking
```

---

## 🧪 Test Invoice Creation (Via API)

### **Example: Create Invoice Manually**

```bash
curl -X POST http://ctcbackend.local/wp-json/ctc/v1/invoices \
  -H "Content-Type: application/json" \
  -H "X-CTC-Key: your-api-key" \
  -H "X-CTC-Timestamp: $(date +%s)" \
  -H "X-CTC-Signature: your-hmac-signature" \
  -d '{
    "booking_id": 1,
    "line_items": [
      {
        "description": "Break/Fix Service",
        "quantity": 1,
        "rate": 150.00,
        "amount": 150.00
      },
      {
        "description": "Travel - Bendigo",
        "quantity": 1,
        "rate": 80.00,
        "amount": 80.00
      }
    ],
    "due_days": 7,
    "notes": "Payment due within 7 days"
  }'
```

### **Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "invoice_number": "INV-20251026-0001",
    "booking_id": 1,
    "status": "draft",
    "subtotal": "230.00",
    "tax_amount": "23.00",
    "total_amount": "253.00",
    "issue_date": "2025-10-26 08:00:00",
    "due_date": "2025-11-02 08:00:00"
  }
}
```

---

## 🎨 Next Steps: Frontend UI

After activating the plugin, the next development phase is:

1. **Admin Invoice Page** - `/admin/invoices` to view/manage invoices
2. **Generate Invoice Button** - In booking details modal
3. **PDF Download** - Professional invoice PDF
4. **Email Integration** - Auto-send invoices via Resend

---

## 💡 Pricing Configuration

### **Service Rates** (configured in `class-invoice.php` line 480):
```php
'break_fix' => $150.00
'rollout' => $200.00
'pos_support' => $175.00
'site_audit' => $180.00
'parts_logistics' => $120.00
```

### **Travel Rates by Region** (line 489):
```php
'bendigo' => $80.00
'ballarat' => $100.00
'shepparton' => $120.00
'wodonga' => $150.00
'latrobe' => $140.00
'melbourne' => $0.00  // No travel charge
```

These can be moved to WordPress settings later for easy editing.

---

## 🐛 Troubleshooting

### **Table Not Created?**
- Check WordPress debug log at `/app/public/wp-content/debug.log`
- Ensure PHP 8.2+ and WordPress 6.6+
- Try deleting and reinstalling the plugin

### **Invoice Not Auto-Creating?**
- Check booking status is set to "completed"
- View WordPress error logs
- Verify Invoice class is loaded (check `wp_options` for `ctc_db_version`)

---

## 📞 Support

If you encounter issues:
1. Check WordPress admin → Tools → Site Health
2. Review error logs
3. Test API endpoints with Postman/Thunder Client

**All set! Ready to activate the plugin?**
