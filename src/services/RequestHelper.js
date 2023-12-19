export default async (request, thunkAPI) => {
  try {
    const result = await request();
    return result;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
};
