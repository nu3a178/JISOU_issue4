import { deleteAllUsers, deleteAllUserSkills } from "../src/utils/supabase.ts";

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
