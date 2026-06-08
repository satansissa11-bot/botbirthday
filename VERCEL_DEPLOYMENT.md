# Vercel Deployment Guide

Complete step-by-step guide to deploy the Birthday Gift Generator to Vercel.

## Prerequisites

- A Vercel account (free tier works)
- Supabase project configured (follow SUPABASE_SETUP.md first)
- GitHub account (for automatic deployments)
- Project code pushed to GitHub

## Step 1: Prepare Your Repository

### Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Birthday Gift Generator"
```

### Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `birthday-gift-generator`
3. Make it public or private (your choice)
4. Don't initialize with README (you already have one)

### Push to GitHub

```bash
git remote add origin https://github.com/your-username/birthday-gift-generator.git
git branch -M main
git push -u origin main
```

## Step 2: Environment Variables for Vercel

### Required Environment Variables

Add these exact variables in Vercel:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | e.g., `https://xyzcompany.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### How to Get These Values

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy the **Project URL** and **anon/public key**

### Example Values

```
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcxNTEyMzQ1NiwibWF4IjoxNzE1NzA4NDU2fQ.example
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in

2. **Add New Project**
   - Click **"Add New..."** > **"Project"**
   - Vercel will show your GitHub repositories

3. **Import Repository**
   - Find and click `birthday-gift-generator`
   - Click **"Import"**

4. **Configure Project**

   **Project Name:**
   - Enter: `birthday-gift-generator` (or your preferred name)
   - This becomes your Vercel URL: `birthday-gift-generator.vercel.app`

   **Framework Preset:**
   - Vercel should auto-detect **Next.js**
   - If not, select **Next.js** manually

   **Root Directory:**
   - Leave as `./` (default)

   **Build Command:**
   - Should auto-detect: `npm run build`
   - If not, enter: `npm run build`

   **Output Directory:**
   - Should auto-detect: `.next`
   - If not, enter: `.next`

5. **Add Environment Variables**
   
   Click **"Environment Variables"** section and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   ```

   **Important:**
   - Click **"Add"** after each variable
   - Select **"Production"**, **"Preview"**, and **"Development"** environments
   - Do NOT check "Sensitive" unless you want to hide values in logs

6. **Deploy**
   - Click **"Deploy"** button
   - Wait for deployment to complete (2-5 minutes)
   - You'll see a live URL when complete

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow Prompts**
   - Link to existing project or create new
   - Add environment variables when prompted
   - Confirm deployment

## Step 4: Verify Build Settings

### Check Build Configuration

After deployment, verify settings in Vercel Dashboard:

1. Go to your project in Vercel
2. Navigate to **Settings** > **General**
3. Verify:

   **Build & Development Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Framework Preset: Next.js

   **Environment Variables:**
   - Both variables should be listed
   - All environments selected (Production, Preview, Development)

### Test the Deployment

1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Test the home page loads
3. Try accessing `/admin` (should work)
4. Try creating a test card
5. Verify the public card page works

## Step 5: Domain Configuration

### Option A: Use Vercel Default Domain (Free)

Your site is automatically available at:
```
https://your-project-name.vercel.app
```

This is free and requires no additional configuration.

### Option B: Add Custom Domain

1. **Purchase a Domain**
   - Buy from any registrar (Namecheap, GoDaddy, etc.)
   - Or use Vercel's domain purchase

2. **Add Domain in Vercel**
   - Go to project **Settings** > **Domains**
   - Click **"Add"**
   - Enter your domain (e.g., `birthday.example.com`)
   - Click **"Add"**

3. **Configure DNS**

   **If using Vercel-purchased domain:**
   - DNS is configured automatically
   - SSL certificate is automatic

   **If using external registrar:**
   - Vercel will show DNS records to add
   - Add these records at your registrar:
     ```
     Type: CNAME
     Name: @ (or www)
     Value: cname.vercel-dns.com
     ```

4. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Vercel will show status in dashboard
   - You'll get an email when ready

5. **Enable HTTPS**
   - Vercel automatically provisions SSL certificates
   - No additional configuration needed

### Subdomain Configuration

For subdomains (e.g., `cards.yourdomain.com`):

1. Add subdomain in Vercel Domains
2. Add CNAME record at your registrar:
   ```
   Type: CNAME
   Name: cards
   Value: cname.vercel-dns.com
   ```

## Step 6: Production Deployment Checklist

### Pre-Deployment Checklist

- [ ] Supabase project is fully configured
- [ ] Database schema is run in Supabase SQL Editor
- [ ] Storage bucket `birthday-photos` is created and public
- [ ] RLS policies are configured
- [ ] Environment variables are tested locally
- [ ] Code is pushed to GitHub
- [ ] `.gitignore` excludes sensitive files
- [ ] All dependencies are in `package.json`

### Vercel Configuration Checklist

- [ ] Project is imported in Vercel
- [ ] Build command is `npm run build`
- [ ] Output directory is `.next`
- [ ] Framework preset is Next.js
- [ ] Environment variables are added:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Variables are selected for all environments
- [ ] Deployment completed successfully

### Post-Deployment Checklist

- [ ] Visit the deployed URL
- [ ] Test home page loads correctly
- [ ] Test admin dashboard at `/admin`
- [ ] Test card creation flow
- [ ] Test public card page at `/card/[slug]`
- [ ] Test photo upload functionality
- [ ] Test template switching
- [ ] Test on mobile device (responsive design)
- [ ] Check browser console for errors
- [ ] Verify Supabase connection works
- [ ] Test automation service (if using locally)

### Security Checklist

- [ ] Supabase anon key is used (not service role key)
- [ ] RLS policies are appropriate for your use case
- [ ] Environment variables are not committed to Git
- [ ] `.env.local` is in `.gitignore`
- [ ] Custom domain has HTTPS enabled
- [ ] No sensitive data in client-side code

## Step 7: Monitor and Maintain

### View Deployment Logs

1. Go to Vercel Dashboard
2. Click your project
3. Navigate to **Deployments**
4. Click on a specific deployment
5. View **Build Logs** and **Function Logs**

### Set Up Alerts

1. Go to project **Settings** > **Notifications**
2. Configure email alerts for:
   - Deployment failures
   - Build errors
   - Domain issues

### Automatic Deployments

Vercel automatically deploys when you:
- Push to `main` branch → Production
- Push to other branches → Preview deployments
- Create pull requests → Preview deployments

### Manual Redeploy

To manually trigger a redeploy:

1. Go to **Deployments** in Vercel
2. Click the three dots on latest deployment
3. Select **"Redeploy"**

## Step 8: Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check `package.json` has all dependencies
- Run `npm install` locally to verify
- Check build logs in Vercel

**Error: "Environment variable not set"**
- Verify variables are added in Vercel
- Check variable names match exactly
- Ensure variables are selected for Production environment

**Error: "Supabase connection failed"**
- Verify Supabase URL and key are correct
- Check Supabase project is active
- Verify RLS policies allow access

### Deployment Successful but Site Won't Load

**Check:**
- Visit Vercel deployment logs
- Check browser console for errors
- Verify environment variables are set
- Test locally with same environment variables

### Images Not Loading

**Check:**
- Verify Supabase Storage bucket exists
- Check bucket is public
- Verify storage policies allow downloads
- Check image URLs in database

### Custom Domain Not Working

**Check:**
- DNS records are configured correctly
- Wait for DNS propagation (up to 48 hours)
- Check Vercel dashboard for domain status
- Verify SSL certificate is issued

## Step 9: Performance Optimization

### Enable Vercel Analytics

1. Go to project **Settings** > **Analytics**
2. Enable **Web Vitals**
3. Monitor performance metrics

### Configure Image Optimization

Vercel automatically optimizes images. Ensure:
- Images are in supported formats (JPEG, PNG, WebP)
- Images are reasonably sized (< 5MB each)
- Use Next.js Image component where possible

### Enable Caching

Vercel automatically caches static assets. For dynamic content:
- Consider using Vercel Edge Functions
- Implement appropriate cache headers
- Use Supabase caching if needed

## Step 10: Scaling Considerations

### Vercel Limits (Free Tier)

- 100GB bandwidth per month
- 6,000 minutes of execution time
- Unlimited deployments
- Automatic HTTPS
- 100MB project size

### When to Upgrade

Consider upgrading to Pro tier if:
- Exceeding bandwidth limits
- Need team collaboration features
- Require priority support
- Need advanced analytics

### Database Scaling

Monitor Supabase usage:
- Free tier: 500MB database, 1GB storage
- Upgrade if approaching limits
- Consider database backups for production

## Step 11: Backup and Recovery

### Database Backups

Supabase automatically backs up:
- Daily backups (free tier)
- Point-in-time recovery (Pro tier)
- Manual backups available in dashboard

### Code Backups

Your code is safely in:
- GitHub repository
- Vercel deployment history
- Local development machine

### Recovery Plan

If deployment fails:
1. Check Vercel deployment logs
2. Rollback to previous deployment
3. Fix issues locally
4. Push fix to GitHub
5. Vercel auto-deploys the fix

## Step 12: Next Steps After Deployment

1. **Share Your Site**
   - Share the Vercel URL with stakeholders
   - Test with real users
   - Gather feedback

2. **Set Up Monitoring**
   - Enable Vercel Analytics
   - Monitor error rates
   - Track performance metrics

3. **Configure Automation** (if using)
   - Install automation service on local server
   - Configure environment variables
   - Test folder monitoring

4. **Custom Domain** (optional)
   - Add custom domain for branding
   - Configure DNS records
   - Enable HTTPS

5. **Documentation**
   - Document your deployment process
   - Create user guide for your team
   - Document any custom configurations

## Quick Reference

### Vercel Dashboard URL
```
https://vercel.com/dashboard
```

### Your Project URL
```
https://your-project-name.vercel.app
```

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Common Commands
```bash
# Deploy via CLI
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Link existing project
vercel link
```

## Support

For Vercel-specific issues:
- Vercel Documentation: https://vercel.com/docs
- Vercel Status: https://www.vercel-status.com
- Vercel Community: https://vercel.com/community

For application issues:
- Check this guide's troubleshooting section
- Review SUPABASE_SETUP.md
- Check GitHub issues
- Review application logs
