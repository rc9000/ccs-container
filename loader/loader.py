#!/usr/bin/python

import glob, pprint, re, sys
from ciscoconfparse import CiscoConfParse       # prereq: easy_install -U ciscoconfparse 
#from dicttoxml import dicttoxml                # prereq: easy_install -U dicttoxml 
from lxml import etree                          # prereq: easy_install -U lxml 
#from lxml.ElementTree import Element, SubElement, ElementTree


dumper = pprint.PrettyPrinter(indent=2, width=60)
confdir = "/opt/ccs/configs"
xmldir = "/opt/ccs/xml"

def main():

    configs = sorted(glob.glob(confdir + "/" + sys.argv[1])) 
    dumper.pprint(configs)

    for f in configs:
        xml = conf_to_xml(f)

def conf_to_xml(f):

    ccp = CiscoConfParse(f)
    print ccp

    hostname = ccp.find_lines("^hostname")[0].lower()
    hostname = re.sub("hostname ", "", hostname)

    xmlroot = etree.Element('add')
    doc = etree.Element('doc')
    xmlroot.append(doc)

    f_id = etree.Element('field') 
    f_id.attrib["name"] = "id"
    f_id.text = hostname
    doc.append(f_id)

    f_type = etree.Element('field') 
    f_type.attrib["name"] = "doctype"
    f_type.text = "full config"
    doc.append(f_type)

   
    f_content = etree.Element('field') 
    f_content.attrib["name"] = "content"
    f_content.text = "\n".join(ccp.find_lines(".*"))
    doc.append(f_content)


    types = ['interface', 'router', 'ip vrf', 'ip access-list', 'class-map', 'policy-map']

    for t in types:
        for obj in ccp.find_objects(r"^"+t):

            subdoc = etree.Element('doc') 
            subid = hostname + " " + obj.text 

            subf_id = etree.Element('field') 
            subf_id.attrib["name"] = "id"
            subf_id.text = subid
            subdoc.append(subf_id)

            subf_type = etree.Element('field') 
            subf_type.attrib["name"] = "doctype"
            subf_type.text = t 
            subdoc.append(subf_type)

            subf_content = etree.Element('field') 
            subf_content.attrib["name"] = "content"
            subf_content.text = "\n".join(ccp.find_all_children("^" + obj.text))
            subdoc.append(subf_content)

            doc.append(subdoc)


    xmlstring = etree.tostring(xmlroot, pretty_print=True)
    etree.ElementTree(xmlroot).write(xmldir + "/" + hostname + ".xml")

if __name__ == "__main__":
    sys.exit(main())

