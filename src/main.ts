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

import "@granite-elements/granite-spinner";

import { load_lovelace } from "./FromCardTools"

@customElement("hacs-frontend")
class HacsFrontendBase extends LitElement {
  @property()
  public hass!: HomeAssistant;

  @property()
  public repositories;

  @property()
  public narrow!: boolean;

  firstUpdated() {
    console.log("loaded");
    this.requestUpdate()
    this.hass.connection.sendMessagePromise({
      type: "hacs/repositories"
    }).then(
      (resp) => {
        this.repositories = resp;
        console.log('Message OK!', resp);
      },
      (err) => {
        console.error('Message failed!', err);
      }
    );

    // "steal" LL elements
    load_lovelace()
  }

  public spinner = html`<granite-spinner color="var(--primary-color)" active hover size=400 containerHeight=100%></granite-spinner>`;

  updated(changedProperties: any) {
    console.log('updated');
    changedProperties.forEach((oldValue: any, propName: any, newValue: any) => {
      console.log(`${propName} changed. oldValue: ${oldValue}, newValue: ${newValue}`);
    });
  }

  protected render(): TemplateResult | void {
    if (this.repositories === undefined) return this.spinner;
    return html`

    <app-header-layout has-scrolling-region>
    <app-header slot="header" fixed>
      <app-toolbar>
        <ha-menu-button .hass="${this.hass}" .narrow="${this.narrow}"></ha-menu-button>
        <div main-title>${this.hass.localize("component.hacs.config.title")}</div>
      </app-toolbar>
    </app-header>




      <div class="hacs-content">


        ${this.repositories.content.map(repo =>
      html`<ha-card header="${repo.name}">
          <div class="card-content">
            <i>${repo.description}<i>
          </div>
          </ha-card>
          `)}


      </div>




  </app-header-layout>
        `;
  }

  static get styles(): CSSResult {
    return css`
    app-header {
      color: var(--text-primary-color);
      background-color: var(--primary-color);
      font-weight: 400;
    }
    ha-card {
      margin: 8px;
    }
    `;
  }
}