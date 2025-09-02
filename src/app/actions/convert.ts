import client from "@/src/api/client";

export const locIDtoName = async (id: string) => {
  const { data, error } = await client
    .from("location")
    .select("name")
    .eq("id", id);

  if (error || data == null) {
    return console.log("Data not found: ", error);
  }

  return data[0].name as string;
};

export const locNameToID = async (loc: string) => {
  const { data, error } = await client
    .from("location")
    .select("id")
    .eq("name", loc.trim());

  if (error || data == null) {
    return console.log("Data not found: ", error);
  }

  return data[0].id as number;
};

export const getLocFromAuth = async () => {
  const { data: userData, error: userError } = await client.auth.getUser();

  if (!userData) {
    console.log("No authenticated user is found.");
    return 0;
  }

  if (userError) {
    console.log("User error: ", userError);
    return 0;
  }

  const authEmail = userData.user.email;
  const { data, error } = await client
    .from("youth_official")
    .select("location")
    .eq("email", authEmail)
    .single();

  if (error) {
    console.log("There seems to be an error with the youth official", error);
    return 0;
  }

  return data.location as number;
};

export const authorIDtoName = async (id: number) => {
  const { data, error } = await client
    .from("youth_official")
    .select("firstname, lastname")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching author name:", error);
    return null;
  }

  if (data) {
    return `${data.firstname} ${data.lastname}`;
  }

  return null;
};

export const authorEmailToInfo = async (email: string) => {
  const { data, error } = await client
    .from("youth_official") // adjust table name if different
    .select("firstname, lastname, position, role")
    .eq("email", email)
    .single();

  if (error || !data) {
    console.error("Error fetching author info:", error);
    return { name: "Unknown Author", position: "N/A", role: "N/A" };
  }

  return {
    name: data.firstname + data.lastname,
    position: data.position,
    role: data.role,
  };
};

export const getUserID = async (): Promise<string> => {
  const { data: sessionData, error: sessionError } =
    await client.auth.getSession();

  if (sessionError) {
    console.error("Authentication error: ", sessionError);
    return "";
  }

  const email = sessionData?.session?.user?.email;
  if (!email) {
    console.error("No user email found in session");
    return "";
  }

  const { data: userData, error: userError } = await client
    .from("youth_official")
    .select("id")
    .eq("email", email)
    .single();

  if (userError) {
    console.error("Error fetching user ID: ", userError);
    return "";
  }

  return userData?.id ?? "";
};
