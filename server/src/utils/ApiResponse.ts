export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T
  ) {}
}
//return res
//.status(200)
//.json(new ApiResponse(true, "Success", user));
