# Admin Website Setup for Notice Board Management

## Overview
This document provides instructions for setting up an admin interface to manage the Notice Board data that gets displayed on the main website.

## Database Schema
The notice board uses a Supabase table with the following structure:

```sql
CREATE TABLE notice_board (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Admin Interface Requirements

### 1. Form Fields
Create a form with the following fields:
- **Title**: Text input (required, max 255 characters)
- **Image**: File upload or URL input
- **Content**: Rich text editor or textarea (supports HTML)
- **Date**: Date picker (defaults to current date)

### 2. Data Management Features
- **Add New Notice**: Form to create new entries
- **Edit Existing**: Ability to modify existing notices
- **Delete**: Remove notices from the database
- **List View**: Display all notices with basic info
- **Preview**: Show how the notice will appear on the main site

### 3. Image Handling
Two approaches for images:
1. **File Upload**: Upload images to Supabase Storage and store the public URL
2. **External URL**: Allow admins to paste image URLs directly

### 4. Content Format
The content field should support HTML for formatting. Example content structure:
```html
<b>Congratulations to Om Mandhane, Bipin Yadav, and Drushti Nagarkar!</b>
<br />
Each awarded <b>$2000</b> by the International Society of Automation for their excellence and dedication.<br/>
<span style="color: #4be38a; font-weight: 500;">ISA VESIT is proud of your achievement!</span>
```

## Implementation Options

### Option 1: Custom Admin Panel
Build a React admin interface with:
- Supabase client for database operations
- Form validation
- Image upload functionality
- CRUD operations

### Option 2: Supabase Dashboard
Use Supabase's built-in table editor:
1. Go to your Supabase project dashboard
2. Navigate to Table Editor
3. Select the `notice_board` table
4. Use the interface to add/edit/delete records

### Option 3: Third-party Admin Tools
Consider tools like:
- **Retool**: Drag-and-drop admin interface
- **Supabase Admin**: Community admin tools
- **Directus**: Headless CMS with Supabase integration

## Sample Data Insert
To add data directly via SQL:

```sql
INSERT INTO notice_board (title, image_url, content, date) VALUES (
  'ISA International Scholarship Winners',
  'https://your-storage-url/isa_scholarship_winner.jpg',
  '<b>Congratulations to Om Mandhane, Bipin Yadav, and Drushti Nagarkar!</b><br />Each awarded <b>$2000</b> by the International Society of Automation for their excellence and dedication.<br/><span style="color: #4be38a; font-weight: 500;">ISA VESIT is proud of your achievement!</span>',
  '2024-06-01'
);
```

## Frontend Integration
The main website's NoticeBoard component will need to be updated to:
1. Install Supabase client: `npm install @supabase/supabase-js`
2. Fetch data from the database instead of using hardcoded array
3. Handle loading states and error handling

## Security Considerations
- If using file uploads, validate file types and sizes
- Sanitize HTML content to prevent XSS attacks
- Consider adding basic authentication for admin access
- Implement input validation on both client and server side

## Next Steps
1. Choose your preferred admin interface approach
2. Set up Supabase client configuration
3. Implement CRUD operations
4. Test data flow from admin to main website
5. Deploy admin interface (can be separate from main site)