export type ReservationData = Record<string, string>;

export const openReservation = (prefill?: ReservationData) => {
  window.dispatchEvent(new CustomEvent('open-reservation', { detail: prefill }));
};
