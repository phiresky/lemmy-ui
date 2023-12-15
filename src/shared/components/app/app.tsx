"use client";
import { isAnonymousPath, isAuthPath } from "@utils/app";
import { dataBsTheme } from "@utils/browser";
import { Component, RefObject, createRef, linkEvent } from "@/inferno";
import { I18nextProvider as Provider } from "react-i18next";
import { Route, Switch } from "@/inferno-router";
import { IsoData, IsoDataOptionalSite } from "../../interfaces";
import { routes } from "../../routes";
import { FirstLoadService, I18NextService } from "../../services";
import AuthGuard from "../common/auth-guard";
import ErrorGuard from "../common/error-guard";
import { ErrorPage } from "./error-page";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Theme } from "./theme";
import AnonymousGuard from "../common/anonymous-guard";
import { CodeTheme } from "./code-theme";
/*import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/modal";*/

export class App extends Component<
  React.PropsWithChildren<{ isoData: IsoData }>
> {
  private readonly mainContentRef: RefObject<HTMLElement>;
  constructor(props: any, context: any) {
    super(props, context);
    this.mainContentRef = createRef();
  }

  handleJumpToContent(event) {
    event.preventDefault();
    this.mainContentRef.current?.focus();
  }

  render() {
    const siteRes = this.props.isoData.site_res;
    const siteView = siteRes?.site_view;
    return (
      <>
        <Provider i18n={I18NextService.i18n}>
          <div
            id="app"
            className="lemmy-site"
            data-bs-theme={dataBsTheme(siteRes)}
          >
            <button
              type="button"
              className="btn skip-link bg-light position-absolute start-0 z-3"
              onClick={linkEvent(this, this.handleJumpToContent)}
            >
              {I18NextService.i18n.t("jump_to_content", "Jump to content")}
            </button>
            {siteView && (
              <>
                <Theme defaultTheme={siteView.local_site.default_theme} />
                <CodeTheme />
              </>
            )}
            <Navbar siteRes={siteRes} />
            <div className="mt-4 p-0 fl-1">
              <div tabIndex={-1}>{this.props.children}</div>

              {/* todo: <Route component={ErrorPage} /> */}
            </div>
            <Footer site={siteRes} />
          </div>
        </Provider>
      </>
    );
  }
}
