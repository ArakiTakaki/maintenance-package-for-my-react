import Faker from "faker";
import Moment from "moment";

export const mockRooms = [];
for (let i = 0; i < 10; i++) {
  mockRooms.push({ name: Faker.company.companyName(), messages: [] });
}

export const mockChatLogs = { name: "SampleRoom", messages: [] };
for (let i = 0; i < 50; i++) {
  const user = Faker.internet.userName();
  const time = Moment(Faker.date.past()).format("YY:MM:DD hh:mm");
  mockChatLogs.messages.push({
    id: i,
    user: user,
    message: Faker.lorem.words(),
    isUserDetail: true,
    time: time
  });
  i++;
  mockChatLogs.messages.push({
    id: i,
    user: user,
    message: Faker.lorem.words(),
    isUserDetail: true,
    time: time
  });
}
