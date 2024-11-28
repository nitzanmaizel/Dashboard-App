import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function HeroSection() {
  return (
    <Box position={'relative'} display={'flex'} justifyContent={'space-between'}>
      <ImageList variant='quilted' cols={8} rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{ p: 0, mb: 0 }}
          >
            <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading='lazy' />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: '/public/assets/hero-1.png',
    title: 'main',
    rows: 4,
    cols: 4,
  },
  {
    img: '/public/assets/hero-2.png',
    title: 'top right',
    rows: 2,
    cols: 4,
  },
  {
    img: '/public/assets/hero-3.png',
    title: 'bottom right',
    rows: 2,
    cols: 4,
  },
];
