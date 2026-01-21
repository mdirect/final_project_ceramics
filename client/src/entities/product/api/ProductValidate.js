export default class ProductValidate {
  static validateData({ name, description, art, image, price, quantity }) {
    console.log(name, description, art, image, price, quantity);

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return {
        isValid: false,
        error: "Наименование должно быть не пустой строкой",
      };
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "Описание должно быть не пустой строкой",
      };
    }
    if (
      !art ||
      typeof art !== "string" ||
      art.trim().length === 0 ||
      art.length > 6
    ) {
      return {
        isValid: false,
        error: "Артикул не должен быть пустой строкой и превышать 6 символов",
      };
    }
    if (!image || typeof image !== "string" || image.trim().length === 0) {
      return {
        isValid: false,
        error: "Изображение должно быть не пустой строкой",
      };
    }
    if (Number.isNaN(+price) || price <= 0) {
      return {
        isValid: false,
        error: "Цена должна быть положительным числом",
      };
    }
    if (Number.isNaN(+quantity) || quantity < 0) {
      return {
        isValid: false,
        error: "Количество должно быть неотрицательным числом",
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}
