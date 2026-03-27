# draw.io GraphXML Syntax Reference

## File Format & Structure
```xml
**IMPORTANT**: When generating GraphXML for draw.io, omit the outer <mxfile> and <diagram> container tags. draw.io import paths expect the file content to start directly with <mxGraphModel>. Producing the file starting at <mxGraphModel> avoids blank/empty diagrams during import.

<mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <!-- diagram elements here -->
  </root>
</mxGraphModel>
```

## Shape Elements
- **Process Box**: `<mxCell value="Label" style="rounded=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">`
- **Decision Diamond**: `<mxCell value="Decision?" style="rhombus;whiteSpace=wrap;html=1;" vertex="1" parent="1">`
- **Terminator (Oval)**: `<mxCell value="Start/End" style="ellipse;whiteSpace=wrap;html=1;" vertex="1" parent="1">`
- **Data Store (Cylinder)**: `<mxCell value="Database" style="shape=cylinder;whiteSpace=wrap;html=1;" vertex="1" parent="1">`
- **Actor/User (Stick Figure)**: `<mxCell value="User" style="shape=mxgraph.flowchart.actor;whiteSpace=wrap;" vertex="1" parent="1">`
- **Swimlane (with top header)**: `<mxCell value="Swimlane Label" style="swimlane;html=1;startSize=40;horizontal=1;" vertex="1" parent="1">`
  - **IMPORTANT**: Always use `horizontal=1` for swimlanes to position headers at the top. Never use `horizontal=0` which places headers on the left side.

## Connector Elements (Arrows)
- **Direct Connection**: `<mxCell edge="1" parent="1" source="cell-id-1" target="cell-id-2"><mxGeometry relative="1" as="geometry" /></mxCell>`
- **Labeled Arrow**: Add `<mxCell value="Condition">` inside the connector element
- **Yes/No Branches**: Use separate connectors from decision diamond with labels "Yes" and "No"
- **Default Style**: `style="edgeStyle=orthogonalEdgeStyle;rounded=1;jumpStyle=line;html=1;"` (Orthogonal, Rounded, Line Jumps)

## Position & Size Attributes
```xml
<mxGeometry x="100" y="50" width="120" height="60" as="geometry" />
```
- `x, y` = coordinates (top-left of element)
- `width, height` = dimensions in pixels

## Style Reference
- `rounded=1` - Rounded corners on boxes
- `strokeColor=#000000` - Border color (hex)
- `fillColor=#ffffff` - Fill color (hex)
- `fontSize=12` - Text size
- `fontColor=#000000` - Text color
- `dashed=1` - Dashed line style
- `strokeWidth=2` - Border thickness

## Example: Simple Flowchart
```xml
<mxGraphModel dx="1434" dy="836" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="Sq_xqB8g_0GA1rzXKa5G-1" target="Sq_xqB8g_0GA1rzXKa5G-2">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-1" value="" style="rounded=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
      <mxGeometry x="360" y="260" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-5" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="Sq_xqB8g_0GA1rzXKa5G-2" target="Sq_xqB8g_0GA1rzXKa5G-4">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-9" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="Sq_xqB8g_0GA1rzXKa5G-2" target="Sq_xqB8g_0GA1rzXKa5G-8">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-2" value="" style="rhombus;whiteSpace=wrap;html=1;rounded=0;" vertex="1" parent="1">
      <mxGeometry x="580" y="250" width="80" height="80" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-7" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="Sq_xqB8g_0GA1rzXKa5G-4" target="Sq_xqB8g_0GA1rzXKa5G-6">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-4" value="" style="whiteSpace=wrap;html=1;rounded=0;" vertex="1" parent="1">
      <mxGeometry x="720" y="260" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-11" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="Sq_xqB8g_0GA1rzXKa5G-6" target="Sq_xqB8g_0GA1rzXKa5G-10">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-6" value="" style="whiteSpace=wrap;html=1;rounded=0;" vertex="1" parent="1">
      <mxGeometry x="920" y="260" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=1;entryDx=0;entryDy=0;" edge="1" parent="1" source="Sq_xqB8g_0GA1rzXKa5G-8" target="Sq_xqB8g_0GA1rzXKa5G-10">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-8" value="" style="whiteSpace=wrap;html=1;rounded=0;" vertex="1" parent="1">
      <mxGeometry x="560" y="420" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-10" value="" style="ellipse;whiteSpace=wrap;html=1;rounded=0;fillColor=#030303;" vertex="1" parent="1">
      <mxGeometry x="1120" y="270" width="40" height="40" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-14" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="Sq_xqB8g_0GA1rzXKa5G-13" target="Sq_xqB8g_0GA1rzXKa5G-1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="Sq_xqB8g_0GA1rzXKa5G-13" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;" vertex="1" parent="1">
      <mxGeometry x="220" y="270" width="40" height="40" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
```

```
