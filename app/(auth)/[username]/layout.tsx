type Props = {
  children: React.ReactNode;
};

export default function ProfileLayout(props: Props) {
  return <div className="ml-12 pb-12">{props.children}</div>;
}
