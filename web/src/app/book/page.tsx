import { BookingForm } from '@/components/forms/booking-form';

export default function BookPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
