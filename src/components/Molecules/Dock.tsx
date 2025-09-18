import type { IconType } from "react-icons";
import type { NavItemType } from "../../types/Dock";

import { FaHome, FaPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router";

class NavItem implements NavItemType {
	id: UUIDType;
	Icon: IconType;

	label: string;
	path: string;

	constructor(label: string, path: string, Icon: IconType) {
		this.id = crypto.randomUUID();

		this.Icon = Icon;
		this.path = path;
		this.label = label;
	}
}

const DockButtons: NavItemType[] = [
	new NavItem("Panel", "/", FaHome),
	new NavItem("Crear", "/create", FaPlus),
	new NavItem("Configuración", "/settings", IoSettingsSharp),
];

function Dock() {
	const location = useLocation();

	return (
		<nav className="dock shrink-0 static overflow-hidden">
			{DockButtons.map((btn) => (
				<Link
					to={btn.path}
					key={btn.id}
					className={
						location.pathname === btn.path
							? "dock-active text-[#003391] transform scale-[110%]"
							: ""
					}
				>
					<btn.Icon />
					<span className="dock-label">{btn.label}</span>
				</Link>
			))}
		</nav>
	);
}

export default Dock;
