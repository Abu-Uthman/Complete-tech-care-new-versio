'use client';

/**
 * Booking Details Modal Component
 * Professional modal dialog for viewing and editing booking details
 * Replaces browser alert() with smooth animations
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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

type BookingDetailsModalProps = {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onSave?: (id: number, updates: Partial<Booking>) => Promise<void>;
};

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'onsite', label: 'On-Site' },
  { value: 'completed', label: 'Completed' },
  { value: 'invoiced', label: 'Invoiced' },
  { value: 'closed', label: 'Closed' },
];

export function BookingDetailsModal({ booking, open, onClose, onSave }: BookingDetailsModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStatus, setEditedStatus] = useState('');
  const [editedInternalNotes, setEditedInternalNotes] = useState('');
  const [editedAssignedTech, setEditedAssignedTech] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Initialize edit state when booking changes
  const handleEdit = () => {
    if (booking) {
      setEditedStatus(booking.status);
      setEditedInternalNotes(booking.internal_notes || '');
      setEditedAssignedTech(booking.assigned_tech || '');
      setIsEditMode(true);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedStatus('');
    setEditedInternalNotes('');
    setEditedAssignedTech('');
  };

  const handleSave = async () => {
    if (!booking || !onSave) return;

    setIsSaving(true);
    try {
      await onSave(booking.id, {
        status: editedStatus,
        internal_notes: editedInternalNotes,
        assigned_tech: editedAssignedTech || undefined,
      });
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to save booking:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
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

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Booking Details
          </DialogTitle>
          <DialogDescription>
            {booking.public_id || `#${booking.id}`} • Created {formatDate(booking.created_at)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Company Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-secondary border-b pb-2">
              Company Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-text-secondary">Company</Label>
                <p className="font-medium">{booking.company}</p>
              </div>
              <div>
                <Label className="text-text-secondary">Contact Name</Label>
                <p className="font-medium">{booking.contact_name}</p>
              </div>
              <div>
                <Label className="text-text-secondary">Email</Label>
                <p className="font-medium">{booking.email}</p>
              </div>
              <div>
                <Label className="text-text-secondary">Phone</Label>
                <p className="font-medium">{booking.phone}</p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-secondary border-b pb-2">
              Service Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-text-secondary">Work Type</Label>
                <p className="font-medium">{formatServiceType(booking.work_type)}</p>
              </div>
              <div>
                <Label className="text-text-secondary">Site ID</Label>
                <p className="font-medium">{booking.site_id || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <Label className="text-text-secondary">Address</Label>
                <p className="font-medium">{booking.address}</p>
              </div>
              {booking.notes && (
                <div className="md:col-span-2">
                  <Label className="text-text-secondary">Client Notes</Label>
                  <p className="font-medium bg-bg-secondary p-3 rounded-md">{booking.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Status & Internal Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-secondary border-b pb-2">
              Status & Internal Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                {isEditMode ? (
                  <Select value={editedStatus} onValueChange={setEditedStatus}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium capitalize">{booking.status.replace('_', ' ')}</p>
                )}
              </div>

              <div>
                <Label htmlFor="assigned-tech">Assigned Technician</Label>
                {isEditMode ? (
                  <input
                    id="assigned-tech"
                    type="text"
                    value={editedAssignedTech}
                    onChange={(e) => setEditedAssignedTech(e.target.value)}
                    placeholder="Enter technician name"
                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                ) : (
                  <p className="font-medium">{booking.assigned_tech || 'Not assigned'}</p>
                )}
              </div>

              <div>
                <Label htmlFor="internal-notes">Internal Notes (Admin Only)</Label>
                {isEditMode ? (
                  <Textarea
                    id="internal-notes"
                    value={editedInternalNotes}
                    onChange={(e) => setEditedInternalNotes(e.target.value)}
                    placeholder="Add internal notes..."
                    rows={4}
                    className="resize-none"
                  />
                ) : (
                  <p className="font-medium bg-bg-secondary p-3 rounded-md min-h-[60px]">
                    {booking.internal_notes || 'No internal notes'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {onSave && (
                <Button onClick={handleEdit}>Edit Details</Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
