import { PrismaClient } from '@prisma/client';

export async function tag(prisma: PrismaClient) {
  await prisma.tag.createMany({
    data: [
      {
        filter: 'Form',
        tag: 'Painted image',
      },
      {
        filter: 'Form',
        tag: 'Relief',
      },
      {
        filter: 'Form',
        tag: 'Three-dimensional',
      },
      //___________
      {
        filter: 'Color',
        tag: 'Mixed colour',
      },
      {
        filter: 'Color',
        tag: 'White',
      },
      {
        filter: 'Color',
        tag: 'Black',
      },
      {
        filter: 'Color',
        tag: 'Yellow',
      },
      {
        filter: 'Color',
        tag: 'Green',
      },
      //___________
      {
        filter: 'Glaze_type',
        tag: 'Ceramically glazed',
      },
      {
        filter: 'Glaze_type',
        tag: 'Non-ceramically glazed',
      },
      {
        filter: 'Glaze_type',
        tag: 'Unglazed',
      },
      //___________
      {
        filter: 'Composition_type',
        tag: 'Multi-part jewellery',
      },
      {
        filter: 'Composition_type',
        tag: 'One-part jewellery',
      },
      //___________
      {
        filter: 'Production_type',
        tag: 'Regular',
      },
      {
        filter: 'Production_type',
        tag: 'May be repeated',
      },
      {
        filter: 'Production_type',
        tag: 'Part of a collection,',
      },
      {
        filter: 'Production_type',
        tag: 'Single piece',
      },
      //___________
      {
        filter: 'Motif_type',
        tag: 'Animalistic',
      },
      {
        filter: 'Motif_type',
        tag: 'People',
      },
      {
        filter: 'Motif_type',
        tag: 'Mythology',
      },
      {
        filter: 'Motif_type',
        tag: 'Esoteric',
      },
      {
        filter: 'Motif_type',
        tag: 'Figurative',
      },
      {
        filter: 'Motif_type',
        tag: 'Ornamental',
      },
      {
        filter: 'Motif_type',
        tag: 'Still life',
      },
      {
        filter: 'Motif_type',
        tag: 'Abstract',
      },
      {
        filter: 'Motif_type',
        tag: 'Body part',
      },
      {
        filter: 'Motif_type',
        tag: 'Story',
      },
    ],
  });
  console.log('Tags seeds done');
}
