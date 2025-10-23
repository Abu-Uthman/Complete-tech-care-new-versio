'use client';

/**
 * Client Portal Dashboard
 * CTC Smart-Hands Project
 *
 * Allows clients to view their service requests and job status
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Booking = {
  id: number;
  public_id?: string;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  work_type?: string;
  site_id?: string;
  address: string;
  notes?: string;
  status: string;
  created_at: string;
  po_number?: string;
  sla?: string;
};

type AuthState = 'login' | 'authenticated';

export default function ClientPortal() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const response = await fetch('/api/portal/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAuthState('authenticated');
        localStorage.setItem('portal_email', email);
        loadBookings(email);
      } else {
        setAuthError('Authentication failed. Please check your email address.');
        setLoading(false);
      }
    } catch {
      setAuthError('Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  const loadBookings = async (clientEmail: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/portal/bookings?email=${encodeURIComponent(clientEmail)}`);
      const result = await response.json();

      if (response.ok && result.success) {
        setBookings(result.data.bookings || []);
      } else {
        setError(result.error || 'Failed to load your service requests');
      }
    } catch {
      setError('Failed to load service requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const savedEmail = localStorage.getItem('portal_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setAuthState('authenticated');
      loadBookings(savedEmail);
    }
  }, []);

  const handleLogout = () => {
    setAuthState('login');
    localStorage.removeItem('portal_email');
    setEmail('');
    setBookings([]);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'confirmed':
        return 'bg-accent/10 text-accent border-accent';
      case 'onsite':
        return 'bg-warning/10 text-warning border-warning';
      case 'completed':
        return 'bg-success/10 text-success border-success';
      case 'invoiced':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'closed':
        return 'bg-slate-100 text-slate-600 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'new':
        return 'We have received your request and will respond shortly';
      case 'confirmed':
        return 'Your service has been confirmed and scheduled';
      case 'onsite':
        return 'Our technician is currently on-site';
      case 'completed':
        return 'Service completed successfully';
      case 'invoiced':
        return 'Invoice has been sent';
      case 'closed':
        return 'Service request closed';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatServiceType = (type: string | undefined) => {
    if (!type) return 'N/A';
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Login Form
  if (authState === 'login') {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Client Portal</h1>
            <p className="text-text-secondary">
              View your service requests and job status
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com.au"
                required
                disabled={loading}
              />
              <p className="mt-2 text-sm text-text-tertiary">
                Enter the email address you used when submitting your service request
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-error/10 border border-error rounded-md">
                <p className="text-sm text-error">{authError}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Accessing Portal...' : 'Access Portal'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              Need help?{' '}
              <a href="mailto:bookings@ctc.example.com" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Client Dashboard
  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">My Service Requests</h1>
              <p className="text-sm text-text-secondary">{email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg">
            <p className="text-error">{error}</p>
          </div>
        )}

        {/* Bookings List */}
        {loading ? (
          <Card className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading your service requests...
            </div>
          </Card>
        ) : bookings.length === 0 ? (
          <Card className="p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-text-tertiary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-primary mb-2">No Service Requests</h2>
            <p className="text-text-secondary mb-6">
              You don't have any service requests yet.
            </p>
            <Button onClick={() => (window.location.href = '/book')}>
              Submit a Service Request
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-primary">
                          {booking.public_id || `#${booking.id}`}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold border rounded-full ${getStatusBadgeClass(
                            booking.status
                          )}`}
                        >
                          {booking.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {getStatusDescription(booking.status)}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-secondary">Company:</span>{' '}
                      {booking.company}
                    </div>
                    <div>
                      <span className="font-medium text-secondary">Service Type:</span>{' '}
                      {formatServiceType(booking.work_type)}
                    </div>
                    <div>
                      <span className="font-medium text-secondary">Contact:</span>{' '}
                      {booking.contact_name}
                    </div>
                    <div>
                      <span className="font-medium text-secondary">Phone:</span>{' '}
                      {booking.phone}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-secondary">Address:</span>{' '}
                      {booking.address}
                    </div>
                    {booking.notes && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-secondary">Details:</span>{' '}
                        {booking.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-text-secondary">
                      Submitted: {formatDate(booking.created_at)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {bookings.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => (window.location.href = '/book')}>
              Submit Another Service Request
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
