import axios from "axios";

export async function post(
  endpoint: string,
  payload: Record<string, any>,
  baseUrl: string
): Promise<any> {
  const url = `${baseUrl}/${endpoint}`;

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
}
