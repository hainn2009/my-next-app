import { Fragment } from "reactn";

export default function Layout(props) {
  return (
    <Fragment>
      <main>{props.children}</main>
    </Fragment>
  );
}
