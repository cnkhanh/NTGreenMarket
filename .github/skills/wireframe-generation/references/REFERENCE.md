# Wireframe Generation References

## Shape Library Reference

Border radius for rounded elements:
- Rounded rectangles (buttons, inputs, cards): arcSize=4 for subtle corners
- Apply: rounded=1;arcSize=4; in style attribute

Common wireframe shapes:

| Component         | draw.io GraphXML Example                                                 | Usage                                    |
|-------------------|-------------------------------------------------------------------------|-------------------------------------------|
| Button            | <mxCell value="Submit" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#0056B3;fontColor=#000000;fontSize=14;sketch=1;"/> | Primary action, black text, 4px radius    |
| Input Field       | <mxCell value="Enter your name" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#666666;fontColor=#999999;fontSize=14;strokeWidth=2;sketch=1;"/> | Input with placeholder, 4px radius        |
| Dropdown          | Input cell plus <mxCell value="▼" style="text;fontColor=#333333;fontSize=16;sketch=1;"/>       | Dropdown with arrow indicator             |
| Text Label        | <mxCell value="Username *" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;sketch=1;"/> | Field labels                              |
| Checkbox          | mxgraph.mockup.forms.checkbox                                            | Boolean selection                         |
| Radio Button      | mxgraph.mockup.forms.radioButton                                         | Single choice                             |
| Search Box        | mxgraph.mockup.forms.searchBox                                           | Search with icon                          |
| Link              | <mxCell value="Forgot password?" style="text;html=1;fontColor=#0056B3;sketch=1;"/>            | Clickable hyperlink                       |
| Heading           | Rectangle with bold text                                                 | Section headings                          |
| Image Placeholder | mxgraph.mockup.graphics.simpleIcon                                       | Image/icon placeholder                    |
| Navigation Bar    | mxgraph.mockup.navigation.topBar                                         | Top navigation header                     |
| Table             | mxgraph.mockup.containers.table                                          | Data table                                |
| Card              | Rounded rectangle                                                        | Content panel                             |
| Modal/Dialog      | mxgraph.mockup.containers.window                                         | Overlay dialog                            |

## GraphXML Structure

XML entity escaping:

| Character  | Escape As     | Example                                    |
|------------|--------------|--------------------------------------------|
| & (ampersand) | &amp;    | Save & Continue -> Save &amp; Continue    |
| < (less than) | &lt;      | < Back -> &lt; Back                       |
| > (greater)   | &gt;       | Next > -> Next &gt;                       |
| " (quote)    | &quot;      | "text"                                   |
| ' (apostrophe)| &apos; or &#39; | User's Profile -> User&apos;s Profile      |

Line breaks in text: use &#xa; within value attributes.
Do not use unescaped & - this causes XML errors.

Structural component example (for reference only; use the single-page template for actual wireframes):

```xml
<mxfile host="app.diagrams.net" version="24.0.0">
  <diagram name="Wireframe - [Screen Name]" id="unique-id">
    <mxGraphModel dx="1422" dy="794" grid="0" gridSize="8" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1920" pageHeight="1080" background="#ffffff">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- Device Frame - MUST be rectangular (rounded=0) -->
        <mxCell id="frame" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=none;strokeColor=#CCCCCC;sketch=1;" vertex="1" parent="1">
          <mxGeometry x="100" y="50" width="375" height="667" as="geometry"/>
        </mxCell>
        <!-- Navigation Bar -->
        <mxCell id="nav" value="App Logo | Menu" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E0E0E0;strokeColor=#000000;align=left;verticalAlign=middle;spacingLeft=16;sketch=1;" vertex="1" parent="1">
          <mxGeometry x="100" y="50" width="375" height="60" as="geometry"/>
        </mxCell>
        <!-- Content Area -->
        <mxCell id="content" value="Main Content Area" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CCCCCC;align=center;verticalAlign=top;spacingTop=16;sketch=1;" vertex="1" parent="1">
          <mxGeometry x="100" y="110" width="375" height="550" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## Screen Viewport Standards

Mobile viewports:
- iPhone: 375x812px or 390x844px
- Android: 360x800px or 412x915px
- Small mobile: 320x568px
- Tablet: 768x1024px (portrait) or 1024x768px (landscape)

Desktop viewports:
- Standard: 1280x720px or 1366x768px
- Wide: 1920x1080px
- Laptop: 1440x900px

Critical: viewports and device frames must be rectangular (rounded=0). Use rounded=1 only for internal components (buttons, cards, inputs), never for the main screen or viewport.

Single-page layout:
- Always place all screens for a business flow on a single diagram page (not multiple tabs).
- Place mobile and desktop views side-by-side for each screen, arrange screens vertically per flow.
- Add screen labels and flow arrows, use consistent spacing (e.g., 80px between screens).

File naming convention:
- [Feature Name] - All Screens - Wireframe - [Date].drawio
- Example: Customer Onboarding - All Screens - Wireframe - 2026-02-06.drawio

## Styling Guidelines

Accessibility - color contrast:
- Normal text (<18pt): 4.5:1
- Large/bold text: 3:1
- UI elements: 3:1

Button text must be BLACK (#000000) on all button backgrounds. Do not use white or light gray text on colored backgrounds.

Visual style requirements:
- Use sketch=1 in the style attribute of every wireframe element.
- No gradients or transparency - solid hex colors only.
- Color palette:
  - Background: #FFFFFF
  - Main containers: #F5F5F5
  - Secondary: #E0E0E0
  - Text: #000000 or #333333
  - Borders: #999999 or #000000
  - Interactive: #007BFF, black text
- Typography:
  - Headings: fontSize=16/18, bold
  - Body: fontSize=12/14
  - Labels: fontSize=10/12
  - Preferred font: Helvetica or Arial
- Spacing:
  - Use 8px grid, padding 16/24px, button height 40/48px, consistent margins
  - Container border clearance: maintain a minimum 8px clearance between any child element and its containing card or frame border. Always calculate container height as: top_padding + sum_of_content_heights + gaps_between_items + bottom_padding. Never let a child element's bottom edge (y + height) meet or exceed its container's bottom edge (card_y + card_height). If content does not fit, increase the container height.
- Component states:
  - Active: normal fill and border
  - Hover: blue border/light blue fill
  - Disabled: 50% opacity or gray
  - Error: #DC3545 border
  - Success: #28A745 border
