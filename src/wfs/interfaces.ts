/* eslint-disable @typescript-eslint/naming-convention */
interface IDescribeFeatureElement {
  TYPE_NAME?: string;
  name?: string;
  substitutionGroup?: SubstitutionGroup;
  type?: SubstitutionGroup;
  otherAttributes?: OtherAttributes;
}

interface OtherAttributes {
  name?: string;
  substitutionGroup?: string;
  type?: string;
}

interface SubstitutionGroup {
  namespaceURI?: string;
  localPart?: string;
  prefix?: string;
  key?: string;
  string?: string;
}

interface IDescribeFeatureComplexType {
  TYPE_NAME?: string;
  name?: string;
  otherAttributes?: OtherAttributes;
  complexContent?: ComplexContent;
}

interface ComplexContent {
  TYPE_NAME?: string;
  extension?: unknown[];
}

interface OtherAttributes {
  name?: string;
}

interface Name {
  namespaceURI?: string;
  localPart?: string;
  prefix?: string;
  key?: string;
  string?: string;
}

interface Value {
  TYPE_NAME?: string;
  elementFormDefault?: string;
  targetNamespace?: string;
  otherAttributes?: OtherAttributes;
  _import?: unknown[];
  complexType?: IDescribeFeatureComplexType[];
  element?: IDescribeFeatureElement[];
}

interface OtherAttributes {
  '{http://www.w3.org/2000/xmlns/}xsd'?: string;
  '{http://www.w3.org/2000/xmlns/}gml'?: string;
  '{http://www.w3.org/2000/xmlns/}osm'?: string;
  '{http://www.w3.org/2000/xmlns/}wfs'?: string;
  elementFormDefault?: string;
  targetNamespace?: string;
}

export interface IDescribeFeatureResponse {
  name?: Name;
  value?: Value;
}
