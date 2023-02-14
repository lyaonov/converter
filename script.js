function convert(id) {
    document.querySelector('.result').classList.remove('active')

    let XSLT, XML = null

    if (id === 'MathML') {
        XSLT = `<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
        <xsl:output method="xml" indent="yes"/>

                 <xsl:template match="/">
                  <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <xsl:apply-templates />
                  </math>
                </xsl:template>

         <xsl:template match="корень">
           <msqrt>
              <xsl:apply-templates select="*"/>
           </msqrt>
        </xsl:template>

        <xsl:template match="строка">
           <mrow>
              <xsl:apply-templates select="*"/>
           </mrow>
        </xsl:template>

        <xsl:template match="операнд">
           <mi>
              <xsl:value-of select="." />
           </mi>
        </xsl:template>

        <xsl:template match="оператор">
           <mo>
              <xsl:value-of select="." />
           </mo>
        </xsl:template>

        <xsl:template match="число">
           <mn>
              <xsl:value-of select="." />
           </mn>
        </xsl:template>

        <xsl:template match="дробь">
           <mfrac>
              <xsl:apply-templates select="*"/>
           </mfrac>
        </xsl:template>

        <xsl:template match="низверх">
           <munderover>
              <xsl:apply-templates select="*"/>
           </munderover>
        </xsl:template>

        <xsl:template match="верх">
           <msup>
              <xsl:apply-templates select="*"/>
           </msup>
        </xsl:template>

        <xsl:template match="низ">
           <msub>
              <xsl:apply-templates select="*"/>
           </msub>
        </xsl:template>

     </xsl:stylesheet>`

        XML = document.querySelector('#XMLDoc').value;
    } else {
        XSLT = `<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <xsl:output method="xml" indent="yes"/>

        <xsl:template match="root">
          <svg width="{графика/@ширина}" height="{графика/@высота}">
            <xsl:apply-templates select="графика/эллипс"/>
          </svg>
        </xsl:template>

        <xsl:template match="эллипс">
          <ellipse id="{@id}" fill="{@заливка}" stroke="{@ободок}" stroke-width="{@ширина-ободка}" cx="{@cx}" cy="{@cy}" rx="{@rx}" ry="{@ry}"/>
        </xsl:template>
      </xsl:stylesheet>`

        XML = document.querySelector('#SVGDoc').value;
    }

    const parser = new DOMParser();
    const XSLTNode = parser.parseFromString(XSLT, 'text/xml');

    const xsltProc = new XSLTProcessor();
    xsltProc.importStylesheet(XSLTNode);


    const xmlDoc = parser.parseFromString(XML, 'text/xml');

    const transformedString = new XMLSerializer().serializeToString(
        xsltProc.transformToDocument(xmlDoc),
    );
    setTimeout(() => document.querySelector('.result').classList.add('active'), 300)

    document.querySelector('.result').innerHTML = transformedString;
}