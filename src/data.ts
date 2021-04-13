import { v4 as uuidv4 } from "uuid";

const NUM_SAMPLE_RESERVATIONS = 4;
const SAMPLE_NAMES = [
  "Jennifer",
  "Steven",
  "Anders",
  "Melissa",
  "Sergei",
  "Manny",
  "Omar",
  "Masoud",
];

export const reservation = {
  id: uuidv4(),
  status: "REQUEST",
  startDate: "2021-04-07T00:48:50.494Z",
  endDate: "2021-04-15T00:48:50.494Z",
  startTime: "9:00 am",
  endTime: "10:00 pm",
  guestName: "Jennifer",
  rooms: 10,
  numberOfGuests: 5,
  listingType: "Penthouse Office",
  payout: 8870,
  guestNumber: "+19255865543",
  serviceFeePercentage: 10,
  profilePicture:
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

function createSampleReservation() {
  const guestName =
    SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
  const id = uuidv4();

  return {
    ...reservation,
    guestName,
    id,
  };
}

const sampleReservations = Array(NUM_SAMPLE_RESERVATIONS)
  .fill(null)
  .map(() => createSampleReservation());

export default sampleReservations;
