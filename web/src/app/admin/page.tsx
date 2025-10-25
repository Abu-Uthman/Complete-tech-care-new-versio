'use client';

/**
 * Admin Dashboard
 * CTC Smart-Hands Project
 *
 * Simple admin interface for managing bookings
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingDetailsModal } from '@/components/booking-details-modal';

type Booking = {
  id: number;
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
  public_id?: string;
  po_number?: string;
  sla?: string;
  internal_notes?: string;
  assigned_tech?: string;
};

type AuthState = 'login' | 'authenticated';

export default function AdminDashboard() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAuthState('authenticated');
        localStorage.setItem('admin_auth', 'true');
        loadBookings();
      } else {
        setAuthError('Invalid password');
      }
    } catch {
      setAuthError('Authentication failed');
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const response = await fetch(`/api/admin/bookings?${params}`);
      const result = await response.json();

      if (response.ok && result.success) {
        setBookings(result.data.bookings || []);
      } else {
        setError(result.error || 'Failed to load bookings');
      }
    } catch {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('admin_auth') === 'true') {
      setAuthState('authenticated');
      loadBookings();
    }
  }, []);

  useEffect(() => {
    if (authState === 'authenticated') {
      loadBookings();
    }
  }, [statusFilter, authState]);

  const handleLogout = () => {
    setAuthState('login');
    localStorage.removeItem('admin_auth');
    setPassword('');
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = async (id: number, updates: Partial<Booking>) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update booking in state optimistically
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, ...updates } : booking
          )
        );
        // Refresh the list to get latest data
        await loadBookings();
      } else {
        throw new Error(result.error || 'Failed to update booking');
      }
    } catch (error) {
      console.error('Save booking error:', error);
      throw error;
    }
  };

  const handleDeleteBooking = async (id: number) => {
    console.log('[Admin] Deleting booking:', id);
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      console.log('[Admin] Delete response:', { ok: response.ok, result });

      if (response.ok && result.success) {
        // Remove booking from state
        setBookings((prev) => prev.filter((booking) => booking.id !== id));
        console.log('[Admin] Booking removed from state');
      } else {
        throw new Error(result.error || 'Failed to delete booking');
      }
    } catch (error) {
      console.error('[Admin] Delete booking error:', error);
      throw error;
    }
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

  const formatServiceType = (type: string | undefined) => {
    if (!type) return 'N/A';
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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

  // Login Form
  if (authState === 'login') {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Login</h1>
            <p className="text-text-secondary">CTC Smart-Hands Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-error/10 border border-error rounded-md">
                <p className="text-sm text-error">{authError}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-text-secondary">Manage bookings and requests</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <Label htmlFor="status-filter" className="mb-2 block">
                Filter by Status
              </Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">All Bookings</option>
                <option value="new">New</option>
                <option value="confirmed">Confirmed</option>
                <option value="onsite">On-Site</option>
                <option value="completed">Completed</option>
                <option value="invoiced">Invoiced</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex-1"></div>
            <Button onClick={loadBookings} variant="outline">
              Refresh
            </Button>
          </div>
        </Card>

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
              Loading bookings...
            </div>
          </Card>
        ) : bookings.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-text-secondary">No bookings found</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {booking.company}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {booking.contact_name} • {booking.email}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold border rounded-full ${getStatusBadgeClass(
                          booking.status
                        )}`}
                      >
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-secondary">Job ID:</span>{' '}
                        {booking.public_id || `#${booking.id}`}
                      </div>
                      <div>
                        <span className="font-medium text-secondary">Work Type:</span>{' '}
                        {formatServiceType(booking.work_type)}
                      </div>
                      <div>
                        <span className="font-medium text-secondary">Phone:</span>{' '}
                        {booking.phone}
                      </div>
                      <div>
                        <span className="font-medium text-secondary">Site ID:</span>{' '}
                        {booking.site_id || 'N/A'}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-secondary">Address:</span>{' '}
                        {booking.address}
                      </div>
                      {booking.notes && (
                        <div className="md:col-span-2">
                          <span className="font-medium text-secondary">Notes:</span>{' '}
                          {booking.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-text-secondary">
                        Created: {formatDate(booking.created_at)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBooking}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
}
