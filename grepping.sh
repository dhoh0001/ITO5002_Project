grep -R --exclude-dir=.next --exclude-dir=node_modules "ec2-3-27-73-173.ap-southeast-2.compute.amazonaws.com" | cut -d: -f1 | uniq | xargs -n1 sed -i 's/ec2-3-27-73-173.ap-southeast-2.compute.amazonaws.com/ec2-3-27-1-118.ap-southeast-2.compute.amazonaws.com/g'