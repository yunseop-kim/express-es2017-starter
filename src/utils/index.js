export function urlChecker(url) {
  const urlRegExp =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return urlRegExp.test(url);
}

export function errorHandler(e, response) {
  if (e instanceof AppError) {
    return response.status(e.status).json({
      message: e.message
    });
  } else {
    return response.status(500).json({
      message: e.message,
      stack: e.stack
    });
  }
}


export function validateOrder(order) {
  if (order && typeof order === 'string') {
    order = order.toLowerCase();
  }
  return ["asc", "desc"].includes(order);
}

export class AppError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

export function validate(item) {
  const {
    name,
    image_path
  } = item

  if (!(name && typeof name === 'string')) {
    throw new AppError(400, "이름이 없거나 형식이 맞지 않음.")
  }

  if (!urlChecker(image_path)) {
    throw new AppError(400, "URL 형식이 맞지 않습니다.")
  }

  return true;
}
