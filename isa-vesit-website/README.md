# ISA VESIT Website

This is the official website for the Information Security Association (ISA) at VESIT. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- **Editorial Management**: Upload and manage PDF editorials with Supabase storage
- **PDF Viewer**: Built-in PDF viewing capabilities
- **Responsive Design**: Mobile-friendly interface
- **Admin Panel**: Editorial upload and management system

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Editorial System

### Overview
The website now supports PDF-based editorials stored directly in Supabase instead of external links. This provides better user experience and content control.

### Database Schema
The `editorials` table includes the following fields:
- `id`: Primary key
- `name`: Editorial title
- `year`: Publication year
- `editorial_pdf_url`: Public URL for the PDF file (new format)
- `editorial_pdf_path`: Storage path for the PDF file (new format)
- `editorial_link`: Legacy external link (for backward compatibility)
- `created_at`: Timestamp

### Features
- **PDF Upload**: Admin can upload PDF files directly through the EditorialUploader component
- **PDF Viewing**: Users can view PDFs in-browser using the built-in PDF viewer
- **Download Support**: Users can download PDF files directly
- **Backward Compatibility**: Supports both new PDF format and legacy external links
- **Responsive Design**: Timeline-based display that works on all devices

### Usage

#### For Admins
1. Use the `EditorialUploader` component to upload new editorials
2. Fill in the editorial name and year
3. Select a PDF file to upload
4. The system automatically handles file storage and database insertion

#### For Users
1. Browse editorials on the main editorials page
2. Filter by year using the filter buttons
3. Click "View PDF" to open PDFs in the flipbook viewer
4. Use zoom controls and navigation buttons in the flipbook
5. Click "Download PDF" to save files locally
6. Use "Open" button to view PDF in a new browser tab

### Technical Implementation

#### File Storage
- PDFs are stored in Supabase Storage bucket named `editorials`
- Files are organized with timestamp-based naming for uniqueness
- Public URLs are generated for direct access

#### Components
- `Editorials.jsx`: Main editorial display page with timeline layout
- `EditorialUploader.jsx`: Admin component for uploading new editorials
- `PDFViewer.jsx`: Wrapper component that loads the FlipBook viewer
- `FlipBook.jsx`: Optimized flipbook-style PDF viewer with lazy loading

#### Performance Optimizations
The flipbook PDF viewer includes several optimizations for faster loading:
1. **Lazy Loading**: Only loads the first 4 pages initially, then loads pages as needed
2. **Progressive Rendering**: Shows page placeholders while content loads
3. **Optimized Scaling**: Uses lower initial scale (1.2x) for faster rendering
4. **JPEG Compression**: Converts pages to compressed JPEG format to reduce memory usage
5. **Smart Preloading**: Automatically loads nearby pages when user navigates

#### Backward Compatibility
The system maintains compatibility with existing editorial links by:
1. Checking for `editorial_pdf_url` first (new PDF format)
2. Falling back to `editorial_link` (legacy external links)
3. Displaying appropriate UI for each format

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Supabase Configuration

### Database Setup
Create an `editorials` table with the following structure:

```sql
CREATE TABLE editorials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  editorial_pdf_url TEXT,
  editorial_pdf_path TEXT,
  editorial_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage Setup
1. Create a storage bucket named `editorials`
2. Set the bucket to public for file access
3. Configure appropriate RLS policies for security

### Environment Variables
Create a `.env` file with your Supabase credentials:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Migration from Links to PDFs
If you have existing editorials with external links, the system supports both formats:
- New editorials uploaded as PDFs will use `editorial_pdf_url`
- Legacy editorials with external links will continue to work via `editorial_link`
- You can gradually migrate old editorials by uploading them as PDFs

## Deployment

The application can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages. Make sure to:
1. Set up your Supabase project and configure the environment variables
2. Build the project using `npm run build`
3. Deploy the `build` folder to your hosting service
