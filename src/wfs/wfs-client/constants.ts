import { OutputFormat, PropertyFilter } from './interfaces';

/* eslint-disable */
const WFS_2_0 = require('ogc-schemas').WFS_2_0;
const GML_3_1_1 = require('ogc-schemas').GML_3_1_1;
const XLink_2_0 = require('w3c-schemas').XLink_2_0;
const XLink_1_0 = require('w3c-schemas').XLink_1_0;
const XSD_1_0 = require('w3c-schemas').XSD_1_0;
const SMIL_2_0_Language = require('ogc-schemas').SMIL_2_0_Language;
const SMIL_2_0 = require('ogc-schemas').SMIL_2_0;
const Filter_2_0 = require('ogc-schemas').Filter_2_0;
const OWS_2_0 = require('ogc-schemas').OWS_2_0;
const OWS_1_1_0 = require('ogc-schemas').OWS_1_1_0;

const Jsonix = require('jsonix').Jsonix;

export const getJsonixContext = (): Record<string, unknown> => {
  const jsonixContext = new Jsonix.Context([
    XSD_1_0,
    OWS_1_1_0,
    XLink_1_0,
    OWS_2_0,
    Filter_2_0,
    SMIL_2_0,
    SMIL_2_0_Language,
    XLink_2_0,
    GML_3_1_1,
    WFS_2_0,
  ]);

  return jsonixContext;
};

/**
 *
 * @param count Maximum number of features matched.
 * @param outputFormat Supported output formats listed here:
 * https://docs.geoserver.org/stable/en/user/services/wfs/outputformats.html
 * @param typeNames Requested feature type.
 * @param pointCoordinates Point coordinates to query. (longitude, latitude)
 * @param dWithin Search distance from point in meters.
 * @returns XML for querying a WFS service by coordinates.
 */
export const getQueryPointXMLBody = (
  count: number,
  outputFormat: string,
  typeName: string,
  pointCoordinates: string,
  dWithin: number,
  filterProperties?: PropertyFilter[]
): string => {
  const polygonIntersectionFilter = `<DWithin>
                                        <fes:ValueReference>osm:geom</fes:ValueReference>
                                        <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                                            <gml:coordinates>${pointCoordinates}</gml:coordinates>
                                        </gml:Point>
                                        <Distance units='m'>${dWithin}</Distance>
                                      </DWithin>`;

  const propertiesFilter = filterProperties
    ?.map(({ propertyName, propertyValue }) => {
      return `<fes:PropertyIsEqualTo>
              <fes:ValueReference>${propertyName}</fes:ValueReference>
              <fes:Literal>${propertyValue}</fes:Literal>
            </fes:PropertyIsEqualTo>`;
    })
    .join('\n');

  const getFeatureQuery = `<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs/2.0" 
                  xmlns:fes="http://www.opengis.net/fes/2.0"
                  xmlns:gml="http://www.opengis.net/gml/3.2"
                  xmlns:sf="http://www.openplans.org/spearfish" 
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  service="WFS" 
                  version="2.0.0" count="${count}"
                  xsi:schemaLocation="http://www.opengis.net/wfs/2.0
                  http://schemas.opengis.net/wfs/2.0/wfs.xsd 
                  http://www.opengis.net/gml/3.2 
                  http://schemas.opengis.net/gml/3.2.1/gml.xsd" 
                  outputFormat="${outputFormat}">
                          <wfs:Query typeNames="${typeName}">
                              <fes:Filter>
                              <fes:And>
                                  ${polygonIntersectionFilter}
                                  ${propertiesFilter ?? ''}
                              </fes:And>
                              </fes:Filter>
                          </wfs:Query>
               </wfs:GetFeature>`;

  return getFeatureQuery;
};

export const DEFAULT_OUTPUT_FORMAT: OutputFormat = 'application/json';
export const DEFAULT_COUNT = 100;
export const DEFAULT_SRS_NAME = 'EPSG:4326';
export const DEFAULT_VERSION = '2.0.0';
export const DEFAULT_DWITHIN = 5;
