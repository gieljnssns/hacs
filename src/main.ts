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


import { load_lovelace } from "./FromCardTools"
import "./HacsSpinner"
import "./HacsPanel"


interface Route {
  prefix: string;
  path: string;
}

@customElement("hacs-frontend")
class HacsFrontendBase extends LitElement {
  @property()
  public hass!: HomeAssistant;

  @property()
  public repositories;

  @property()
  public route!: Route;

  @property()
  public narrow!: boolean;

  @property()
  public panel!: String;

  private getRepositories(): void {
    this.repositories = undefined;
    this.requestUpdate();
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
    )
  };

  firstUpdated() {
    this.getRepositories()

    // "steal" LL elements
    load_lovelace()
  }

  protected render(): TemplateResult | void {
    var page = this._page
    if (this.repositories === undefined) return html`<hacs-spinner></hacs-spinner>`;
    var _repositories = this.repositories.content;

    if (page !== null) {
      var filter = this._page;
      _repositories = this.repositories.content.filter(function (repo) {
        return repo.category == filter;
      });
    }

    return html`

    <app-header-layout has-scrolling-region>
    <app-header slot="header" fixed>
      <app-toolbar>
        <ha-menu-button .hass="${this.hass}" .narrow="${this.narrow}"></ha-menu-button>
        <div main-title>${this.hass.localize("component.hacs.config.title")}</div>
      </app-toolbar>
    </app-header>
    <paper-tabs
    scrollable
    attr-for-selected="page-name"
    .selected="${page}"
    @iron-activate=${this.handlePageSelected}>

    <paper-tab page-name="installed">
    INSTALLED
    </paper-tab>

    <paper-tab page-name="integration">
    INTEGRATIONS
    </paper-tab>

    <paper-tab page-name="plugin">
    PLUGINS
    </paper-tab>

    <paper-tab page-name="appdaemon">
    APPDAEMON APPS
    </paper-tab>

    <paper-tab page-name="python_script">
    PYTHON SCRIPTS
    </paper-tab>

    <paper-tab page-name="theme">
    THEMES
    </paper-tab>

    <paper-tab class="right" page-name="settings">
    ${this.hass.localize("component.hacs.common.settings").toUpperCase()}
    </paper-tab>

    </paper-tabs>

    <hacs-panel .repositories=${JSON.stringify(this.repositories.content)} .panel="${this._page}"></hacs-panel>

    </app-header-layout>
        `;
  }

  handlePageSelected(ev) {
    this.requestUpdate();
    const newPage = ev.detail.item.getAttribute("page-name");
    this.panel = newPage;
    console.log("nav")
    navigate(this, `/hacs/${newPage}`);
  }

  private get _page() {
    if (this.route.path.substr(1) === null) return "installed";
    return this.route.path.substr(1);
  }

  static get styles(): CSSResult {
    return css`
    :host {
      color: var(--primary-text-color);
      --paper-card-header-color: var(--primary-text-color);
    }
    app-header {
      color: var(--text-primary-color);
      background-color: var(--primary-color);
      font-weight: 400;
    }
    paper-tabs {
      color: var(--text-primary-color);
      background-color: var(--primary-color);
      font-weight: 400;
      --paper-tabs-selection-bar-color: #fff;
      text-transform: uppercase;
    }
    ha-card {
      margin: 8px;
    }
    .hacs-repositories {
      display: grid;

      grid-template-columns: repeat(3, 1fr);
    }
    `;
  }
}

const navigate = (
  _node: any,
  path: string,
  replace: boolean = true
) => {
  if (replace) {
    history.replaceState(null, "", path);
  } else {
    history.pushState(null, "", path);
  }
};