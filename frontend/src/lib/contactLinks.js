export function whatsappLink(contact, customMessage) {
  const number = contact?.whatsapp_number || "";
  const message = customMessage || contact?.whatsapp_default_message || "Hi, I would like to check room availability and pricing.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function whatsappRoomLink(contact, roomName) {
  return whatsappLink(contact, `Hi, I would like to check availability and pricing for the ${roomName}. Please share more details.`);
}

export function callLink(contact) {
  return `tel:${(contact?.phone || "").replace(/\s+/g, "")}`;
}

export function mailLink(contact) {
  return `mailto:${contact?.email || ""}`;
}
