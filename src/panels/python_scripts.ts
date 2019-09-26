import {
  LitElement,
  customElement,
  CSSResult,
  TemplateResult,
  html,
  css,
  property
} from "lit-element";

import {
  HomeAssistant
} from "custom-card-helpers";

@customElement("hacs-panel-python_scripts")
export class HacsPanelPythonScripts extends LitElement {

  @property()
  public hass!: HomeAssistant;

  @property()
  public repositories;

  protected render(): TemplateResult | void {
    var _repositories = this.repositories.content || [];
    _repositories = this.repositories.content.filter(function (repo) {
      return repo.category === "python_script";
    });

    return html`
    <div class="hacs-repositories">
    ${_repositories.map(repo =>
      html`<ha-card header="${repo.name}">
      <div class="card-content">
        <i>${repo.description}<i>
      </div>
      </ha-card>
      `)}
    </div>
          `;
  }

  static get styles(): CSSResult {
    return css`
      :host {
        color: var(--primary-text-color);
      }
      ha-card {
        margin: 8px;
      }
      `;
  }
}