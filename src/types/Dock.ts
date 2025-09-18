import type { IconType } from "react-icons";

export interface NavItemType {
	id: UUIDType;
	Icon: IconType;
	label: string;
	path: string;
}
