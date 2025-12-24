function createResponse(status: "success" | "error", data: unknown) {
  const response = {
    status,
    data,
  };

  return response;
}

export { createResponse };
