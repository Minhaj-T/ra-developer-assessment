export const destinationBySlugQuery = `
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    tagline,
    heroImage,
    description,
    highlights,
    goodToKnow,
    metaTitle,
    metaDescription
  }
`;

export const packagesByDestinationQuery = `
  *[_type == "package" && destination->slug.current == $slug]
  | order(featured desc, _createdAt asc) {
    _id,
    _type,
    name,
    slug,
    duration,
    price,
    originalPrice,
    shortDescription,
    heroImage,
    included,
    featured
  }
`;

export const featuredPackagesQuery = packagesByDestinationQuery;

export const packageBySlugQuery = `
  *[_type == "package" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    duration,
    price,
    originalPrice,
    shortDescription,
    heroImage,
    included,
    itinerary,
    featured,
    destination->{ name, slug }
  }
`;
