import { v4 as uuidv4 } from "uuid";
import { getRandomElement, getRandomInt } from "./util";

const LISTING_TYPES = [
  "Penthouse Room Office",
  "Standard Room Office",
  "Hotel Lobby",
];
const SAMPLE_NAMES = [
  "Jennifer",
  "Steven",
  "Anders",
  "Melissa",
  "Sergei",
  "Manny",
  "Omar",
  "Masoud",
  "Eric",
  "Joe",
  "Ashley",
  "Dennis",
  "Bob",
  "Zoe",
  "Nick",
  "Emma",
  "Jill",
  "Erica",
  "David",
  "Matt",
  "Dan",
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
  const guestName = getRandomElement(SAMPLE_NAMES);
  const listingType = getRandomElement(LISTING_TYPES);
  const numberOfGuests = getRandomInt(1, 8);
  const rooms = getRandomInt(1, 20);
  const payout = getRandomInt(2000, 9999);
  const id = uuidv4();

  return {
    ...reservation,
    numberOfGuests,
    listingType,
    guestName,
    payout,
    rooms,
    id,
  };
}

const sampleReservations = Array(getRandomInt(4, 10))
  .fill(null)
  .map(() => createSampleReservation());

export default sampleReservations;
