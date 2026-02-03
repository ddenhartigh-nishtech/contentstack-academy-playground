// Base interfaces for common structures

interface DataCslp {
	"data-cslp": string;
}

interface MetadataUid {
	uid: string;
	$: {
		uid: DataCslp;
	};
}

interface Link {
	title: string;
	href: string;
	$: {
		title: DataCslp;
		href: DataCslp;
	};
}

interface ACL {
	$: Record<string, never>;
}

interface PublishDetails {
	time: string;
	user: string;
	environment: string;
	locale: string;
	$: {
		time: DataCslp;
		user: DataCslp;
		environment: DataCslp;
		locale: DataCslp;
	};
}

interface SEO {
	meta_title: string;
	meta_description: string;
	meta_image: null | string;
	$: {
		meta_title: DataCslp;
		meta_description: DataCslp;
		meta_image: DataCslp;
	};
}

// Page Reference Interface
interface PageReference {
	_content_type_uid: string;
	uid: string;
	_version: number;
	locale: string;
	ACL: ACL;
	_in_progress: boolean;
	content: any[];
	created_at: string;
	created_by: string;
	seo: SEO;
	tags: any[];
	title: string;
	updated_at: string;
	updated_by: string;
	url: string;
	publish_details: PublishDetails;
	$: {
		_content_type_uid: DataCslp;
		uid: DataCslp;
		_version: DataCslp;
		locale: DataCslp;
		ACL: DataCslp;
		_in_progress: DataCslp;
		content: DataCslp;
		created_at: DataCslp;
		created_by: DataCslp;
		seo: DataCslp;
		tags: DataCslp;
		title: DataCslp;
		updated_at: DataCslp;
		updated_by: DataCslp;
		url: DataCslp;
		publish_details: DataCslp;
	};
}

// Search Bar Interface
// interface SearchBar {
// 	uid: string;
// 	_content_type_uid: string;
// 	$: {
// 		uid: DataCslp;
// 		_content_type_uid: DataCslp;
// 	};
// }
interface SearchBar {
	uid: string;
	title: string;
	placeholder_text: string;
	button_aria_label: string;
	submit_action: string;
	tracking_name: string;
	$?: {
		uid: DataCslp;
		title: DataCslp;
		placeholder_text: DataCslp;
		button_aria_label: DataCslp;
		submit_action: DataCslp;
		tracking_name: DataCslp;
	};
}

// Account Menu Item Interface
interface AccountMenuItem {
	order: null | number;
	_metadata: MetadataUid;
	label: string;
	link: Link;
	$: {
		order: DataCslp;
		_metadata: DataCslp;
		label: DataCslp;
		link: DataCslp;
	};
}

// Navigation Menu Interface
interface NavigationMenuItem {
	order: number;
	_metadata: MetadataUid;
	search_bar: SearchBar[];
	label: string;
	call_to_action: Link;
	open_in_new_tab: boolean;
	page_reference: PageReference[];
	account_menu: AccountMenuItem[];
	$: {
		order: DataCslp;
		_metadata: DataCslp;
		search_bar?: DataCslp;
		label: DataCslp;
		call_to_action: DataCslp;
		open_in_new_tab: DataCslp;
		page_reference: DataCslp;
		account_menu: DataCslp;
		[key: string]: DataCslp | undefined;
	};
}

// Mega Menu Interfaces

interface Logo {
	uid: string;
	_version: number;
	parent_uid: string;
	title: string;
	created_by: string;
	updated_by: string;
	created_at: string;
	updated_at: string;
	content_type: string;
	file_size: string;
	filename: string;
	ACL: ACL;
	is_dir: boolean;
	tags: any[];
	publish_details: PublishDetails;
	url: string;
	$: {
		uid: DataCslp;
		_version: DataCslp;
		parent_uid: DataCslp;
		title: DataCslp;
		created_by: DataCslp;
		updated_by: DataCslp;
		created_at: DataCslp;
		updated_at: DataCslp;
		content_type: DataCslp;
		file_size: DataCslp;
		filename: DataCslp;
		ACL: DataCslp;
		is_dir: DataCslp;
		tags: DataCslp;
		publish_details: DataCslp;
		url: DataCslp;
	};
}

interface MegaMenuT2 {
	order: null | number;
	_metadata: MetadataUid;
	label: string;
	link: Link;
	$: {
		order: DataCslp;
		_metadata: DataCslp;
		label: DataCslp;
		link: DataCslp;
	};
}

interface MegaMenuT1 {
	order: number;
	_metadata: MetadataUid;
	label: string;
	link: Link;
	mega_menu_t2: MegaMenuT2[];
	$: {
		order: DataCslp;
		_metadata: DataCslp;
		label: DataCslp;
		link: DataCslp;
		mega_menu_t2: DataCslp;
		[key: string]: DataCslp | undefined;
	};
}

interface MegaMenuItem {
	order: number;
	_metadata: MetadataUid;
	logo: Logo | null;
	label: string;
	link: Link;
	mega_menu_t1: MegaMenuT1[];
	$: {
		order: DataCslp;
		_metadata: DataCslp;
		logo: DataCslp;
		label: DataCslp;
		link: DataCslp;
		mega_menu_t1: DataCslp;
		[key: string]: DataCslp | undefined;
	};
}

interface HeaderData {
	navigation_menu: NavigationMenuItem[];
	mega_menu: MegaMenuItem[];
	title: string;
	// there's more but I don't care about it
}

// Main export types
export type NavigationMenu = NavigationMenuItem[];
export type MegaMenu = MegaMenuItem[];

// Export all interfaces for individual use
export type {
	HeaderData,
	// DataCslp,
	// MetadataUid,
	// Link,
	// ACL,
	// PublishDetails,
	// SEO,
	// PageReference,
	// SearchBar,
	// AccountMenuItem,
	// NavigationMenuItem,
	// Logo,
	// MegaMenuT2,
	// MegaMenuT1,
	// MegaMenuItem,
};
