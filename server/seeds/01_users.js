/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.schema.raw("TRUNCATE items CASCADE");
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      first_name: "alex",
      last_name: "sims",
      username: "asims",
      password_digest: "",
    },
    {
      id: 2,
      first_name: "me-me",
      last_name: "rancher",
      username: "mrancher",
      password_digest: "",
    },
    {
      id: 3,
      first_name: "kiara",
      last_name: "wiliams",
      username: "kwiliams",
      password_digest: "",
    },
  ]);
};
