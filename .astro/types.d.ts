declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"people": {
"andrej-karpathy.md": {
	id: "andrej-karpathy.md";
  slug: "andrej-karpathy";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"anne-steptoe.md": {
	id: "anne-steptoe.md";
  slug: "anne-steptoe";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"apoorva-mehta.md": {
	id: "apoorva-mehta.md";
  slug: "apoorva-mehta";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ben-vinegar.md": {
	id: "ben-vinegar.md";
  slug: "ben-vinegar";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"chris-best.md": {
	id: "chris-best.md";
  slug: "chris-best";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"dileshni-jayasinghe.md": {
	id: "dileshni-jayasinghe.md";
  slug: "dileshni-jayasinghe";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"dominique-simoneauritchie.md": {
	id: "dominique-simoneauritchie.md";
  slug: "dominique-simoneauritchie";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"farhan-thawar.md": {
	id: "farhan-thawar.md";
  slug: "farhan-thawar";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"garrett-camp.md": {
	id: "garrett-camp.md";
  slug: "garrett-camp";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"ivan-zhang.md": {
	id: "ivan-zhang.md";
  slug: "ivan-zhang";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"janet-bannister.md": {
	id: "janet-bannister.md";
  slug: "janet-bannister";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"margaret-leibovic.md": {
	id: "margaret-leibovic.md";
  slug: "margaret-leibovic";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"matei-zaharia.md": {
	id: "matei-zaharia.md";
  slug: "matei-zaharia";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"matt-whetham.md": {
	id: "matt-whetham.md";
  slug: "matt-whetham";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"michelle-zatlyn.md": {
	id: "michelle-zatlyn.md";
  slug: "michelle-zatlyn";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"raquel-urtasun.md": {
	id: "raquel-urtasun.md";
  slug: "raquel-urtasun";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"reynold-xin.md": {
	id: "reynold-xin.md";
  slug: "reynold-xin";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
"tobias-lutke.md": {
	id: "tobias-lutke.md";
  slug: "tobias-lutke";
  body: string;
  collection: "people";
  data: InferEntrySchema<"people">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
