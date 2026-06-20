import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'Package name (e.g., "China Highlights Tour")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "reference",
      to: [{ type: "destination" }],
      description: "Which destination does this package belong to?",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'Duration (e.g., "8 Days / 7 Nights")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (AED)",
      type: "number",
      description: "Starting price in AED",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (AED)",
      type: "number",
      description: "Optional original price for showing a discount",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Brief description (2-3 sentences)",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Package hero image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "included",
      title: "What's Included",
      type: "array",
      description: "List of inclusions",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      description: "Day-by-day itinerary",
      of: [
        defineArrayMember({
          name: "itineraryDay",
          title: "Itinerary Day",
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "number",
              validation: (rule) => rule.required().positive().integer(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { day: "day", title: "title" },
            prepare({ day, title }) {
              return { title: `Day ${day}: ${title}` };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on destination page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "destination.name",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "No destination",
        media,
      };
    },
  },
});
