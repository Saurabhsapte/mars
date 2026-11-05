import { z } from 'zod';
export const schemas = {
  home: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string(),
      "primaryCta": z.string(),
      "secondaryCta": z.string()
    }),
    "intro": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string()
    }),
    "menu": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "items": z.array(z.object({
        "name": z.string(),
        "description": z.string(),
        "price": z.string(),
        "id": z.string()
      }))
    }),
    "visit": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string(),
      "note": z.string()
    }),
    "contact": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string(),
      "formTitle": z.string()
    }),
    "footer": z.object({
      "tagline": z.string(),
      "copyright": z.string()
    })
  }),
  about: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string()
    }),
    "story": z.object({
      "title": z.string(),
      "paragraphs": z.array(z.object({
        "text": z.string(),
        "id": z.string()
      }))
    }),
    "values": z.object({
      "title": z.string(),
      "items": z.array(z.object({
        "title": z.string(),
        "body": z.string(),
        "id": z.string()
      }))
    }),
    "visit": z.object({
      "title": z.string(),
      "body": z.string(),
      "cta": z.string()
    })
  }),
  menu: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string()
    }),
    "sections": z.array(z.object({
      "title": z.string(),
      "items": z.array(z.object({
        "name": z.string(),
        "description": z.string(),
        "price": z.string(),
        "id": z.string()
      })),
      "id": z.string()
    })),
    "note": z.object({
      "title": z.string(),
      "body": z.string()
    })
  }),
  contact: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string()
    }),
    "visit": z.object({
      "title": z.string(),
      "locationLabel": z.string(),
      "locationValue": z.string(),
      "hoursLabel": z.string(),
      "hoursValue": z.string(),
      "details": z.string()
    }),
    "form": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "body": z.string(),
      "formTitle": z.string(),
      "nameLabel": z.string(),
      "emailLabel": z.string(),
      "inquiryLabel": z.string(),
      "guestCountLabel": z.string(),
      "dateLabel": z.string(),
      "messageLabel": z.string(),
      "messagePlaceholder": z.string(),
      "submitLabel": z.string(),
      "successMessage": z.string(),
      "errorMessage": z.string()
    })
  }),
  newsletter: z.object({
    "eyebrow": z.string(),
    "title": z.string(),
    "body": z.string(),
    "emailLabel": z.string(),
    "emailPlaceholder": z.string(),
    "submitLabel": z.string(),
    "successMessage": z.string(),
    "errorMessage": z.string()
  }),
  pages: {
    grand_opening: z.object({
      "hero": z.object({
        "badge": z.string(),
        "headline": z.string(),
        "subheadline": z.string(),
        "ctaLabel": z.string()
      }),
      "countdown": z.object({
        "bannerText": z.string(),
        "bannerSuffix": z.string()
      }),
      "offers": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "desc": z.string()
        }))
      }),
      "visit": z.object({
        "heading": z.string(),
        "hours": z.object({
          "label": z.string(),
          "weekday": z.string(),
          "weekend": z.string()
        }),
        "location": z.object({
          "label": z.string(),
          "name": z.string(),
          "tagline": z.string()
        }),
        "ctaLabel": z.string()
      }),
      "ended": z.object({
        "headline": z.string(),
        "message": z.string(),
        "ctaLabel": z.string()
      }),
      "comingSoon": z.object({
        "headline": z.string(),
        "message": z.string(),
        "ctaLabel": z.string()
      })
    }),
    blog_list: z.object({
      "hero": z.object({
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "emptyState": z.string()
    }),
    blog_post: z.object({
      "notFound": z.object({
        "headline": z.string(),
        "message": z.string(),
        "backLabel": z.string()
      }),
      "backLabel": z.string(),
      "moreLabel": z.string()
    })
  }
};
export type Schemas = typeof schemas;