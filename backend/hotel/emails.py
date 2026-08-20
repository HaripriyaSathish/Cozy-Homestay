"""Email notifications for booking and contact enquiries."""
from django.conf import settings
from django.core.mail import send_mail


def _notify_hotel(subject, lines):
    if not settings.HOTEL_NOTIFICATION_EMAIL:
        return
    body = "\n".join(lines)
    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.HOTEL_NOTIFICATION_EMAIL],
        fail_silently=True,
    )


def _confirm_guest(subject, body, guest_email):
    if not guest_email:
        return
    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[guest_email],
        fail_silently=True,
    )


def send_booking_emails(booking):
    room_name = booking.room_preference.name if booking.room_preference else "No preference"
    _notify_hotel(
        subject=f"New Booking Enquiry — {booking.name}",
        lines=[
            f"Reference: {booking.reference_code}",
            f"Name: {booking.name}",
            f"Email: {booking.email}",
            f"Phone: {booking.phone}",
            f"Check-in: {booking.check_in}",
            f"Check-out: {booking.check_out}",
            f"Adults: {booking.adults}  Children: {booking.children}",
            f"Rooms requested: {booking.rooms_requested}",
            f"Room preference: {room_name}",
            f"Special request: {booking.special_request or '-'}",
        ],
    )
    _confirm_guest(
        subject="We've received your stay enquiry",
        body=(
            f"Hi {booking.name},\n\n"
            f"Thank you for your interest in staying with us. We've received your enquiry "
            f"({booking.reference_code}) for {booking.check_in} to {booking.check_out}.\n"
            "Our team will confirm availability and reach out shortly.\n\n"
            "Warm regards,\nCozy Homestay Team"
        ),
        guest_email=booking.email,
    )


def send_contact_emails(enquiry):
    _notify_hotel(
        subject=f"New Contact Enquiry — {enquiry.name}",
        lines=[
            f"Name: {enquiry.name}",
            f"Email: {enquiry.email}",
            f"Phone: {enquiry.phone or '-'}",
            f"Message: {enquiry.message}",
        ],
    )
    _confirm_guest(
        subject="We've received your message",
        body=(
            f"Hi {enquiry.name},\n\n"
            "Thanks for reaching out. Our team has received your message and will get back "
            "to you shortly.\n\nWarm regards,\nCozy Homestay Team"
        ),
        guest_email=enquiry.email,
    )
