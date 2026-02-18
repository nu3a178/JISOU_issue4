import { deleteAllUsers, deleteAllUserSkills } from "./supabase_batch.ts";

const run = async () => {
  await deleteAllUserSkills();
  await deleteAllUsers();
};

run()
  .then(() => {
    console.log("Batch process completed successfully.");
  })
  .catch((error) => {
    console.error("Batch process failed:", error);
  });
