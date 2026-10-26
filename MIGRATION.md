# Safe launch and WordPress migration plan

No live WordPress files, database, DNS records or domains were changed.

1. Obtain an authorized full backup of the current WordPress files and database, plus an export of theme/Elementor templates, plugins, media and redirects. Verify a restore on isolated staging before changing live hosting.
2. Export the full URL inventory from WordPress, sitemap, Search Console and relevant logs. The supplied rendered homepage does not contain a complete URL inventory; do not invent one.
3. Confirm the Academy destination and build its verified education content separately. Do not move all old course URLs to the B2B homepage. Keep existing education URLs available until appropriate replacements are approved.
4. Create a mapping table with `old_url,new_url,reason,status,verified`. The root homepage changes purpose; approve that intentionally. Existing course pages need equivalent Academy destinations. Retired pages without equivalents need a deliberate 404/410 decision. Avoid redirect chains and soft 404s.
5. Review the new website on staging; approve contact destination and legal copy; verify actual form delivery. Confirm title/canonical/robots/sitemap and asset permissions. Test the real hosting 404 behavior and headers.
6. Agree a cutover window, responsible person and rollback criteria. Keep backup hosting and original DNS values. Use the hosting/DNS provider's documented domain procedure only after approval.
7. Deploy the exact reviewed version. Add redirects at the old host or routing layer, verify HTTP status and targets, then update internal links and the final sitemap. Enable indexing only for the approved public hostname.
8. Monitor errors, inquiries, search coverage and important old URLs after cutover. Roll back to the verified WordPress backup and previous DNS configuration if critical navigation or inquiry failures occur.

## Academy boundary

Tentative hostname: `learn.nandlab.in`. It should share the supplied monogram with a separately typeset Academy descriptor. Course content, fees, admissions, trainer profiles, permissions and policies require separate verification. The main site currently links only to a local planned-experience page, avoiding a link to an unverified subdomain.

## Hosting configurations

The prepared output is portable static HTML. Serve `dist` as the document root, directory index files normally, and `404.html` with status 404. Use HTTPS and compression. Add a reasonable asset cache policy with versioning/invalidation when updating files. The local development server is not intended as a production server.
