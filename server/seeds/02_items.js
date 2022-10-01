/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("items").insert([
    {
      id: 1,
      item_name: "laptop",
      description: "macbook laptop",
      quantity: 3,
      users_id: 1,
    },
    {
      id: 2,
      item_name: "tablet",
      description: "Apple iPad",
      quantity: 5,
      users_id: 2,
    },
    {
      id: 3,
      item_name: "monitor",
      description: "22in Samsung",
      quantity: 10,
      users_id: 3,
    },
    {
      id: 4,
      item_name: "watch",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nat",
      quantity: 7,
      users_id: 1,
    },
  ]);
};
