import { Product } from "../../types";
import { Component } from "../base/Component";

export class SuccessModal extends Component<Product> {
  private description: HTMLElement;

  constructor(container: HTMLElement) {
    super(container)
  }
}