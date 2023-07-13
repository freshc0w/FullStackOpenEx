interface HeaderName {
	name: string;
}

const Header = ({ name }: HeaderName) => {
	return <h1>{name}</h1>;
};

export default Header;