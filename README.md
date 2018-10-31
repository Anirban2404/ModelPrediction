# Model Prediction Services
## To install NodeJS on Ubuntu 16.04
```
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install nodejs -y
```

## To install Docker CE on Ubuntu 16.04
```
sudo apt-get update -y 
sudo apt-get install apt-transport-https ca-certificates curl -y 
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
sudo apt-key fingerprint 0EBFCD88 
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update -y 
sudo apt-get install docker-ce -y 
```

## Install and run prediction docker containers
```
sudo time docker run -p 7000:7000 -d docgroupvandy/xceptionkeras     		// 0m21.874ss
sudo time docker run -p 7001:7001 -d docgroupvandy/vgg16keras        		// 0m19.970s
sudo time docker run -p 7002:7002 -d docgroupvandy/vgg19keras        		// 0m19.449s
sudo time docker run -p 7003:7003 -d docgroupvandy/resnet50keras     		// 0m23.76s
sudo time docker run -p 7004:7004 -d docgroupvandy/inceptionv3keras  		// 0m22.963s
sudo time docker run -p 7005:7005 -d docgroupvandy/inceptionresnetv2keras   // 0m25.961s
sudo time docker run -p 7006:7006 -d docgroupvandy/mobilenetkeras           // 0m24.592s
sudo time docker run -p 7007:7007 -d docgroupvandy/densenet121keras 		// 0m23.308s
sudo time docker run -p 7008:7008 -d docgroupvandy/densenet169keras 		// 0m23.779s
sudo time docker run -p 7009:7009 -d docgroupvandy/densenet201keras 		// 0m31.228s
sudo time docker run -p 7010:7010 -d docgroupvandy/word2vec_google 			// 3m19.430s	
sudo time docker run -p 7011:7011 -d docgroupvandy/word2vec_glove 			// 0m35.440s
sudo time docker run -p 7012:7012 -d docgroupvandy/speech-to-text-wavenet	// 0m35.860s
```

## To start the model prediction server
```
npm update
npm start
```

### Now go to <$<serverip>$>:5555
